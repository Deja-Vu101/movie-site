import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { setUser } from "../../../store/slices/userSlice";
import { initialState } from "../../../store/slices/userSlice";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../AvatarEditor";
import TitleSite from "../../Header/TitleSite";
import { GiConfirmed } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface IOwnProps {
  closeModal: () => void;
}

const ProfileEdit: React.FC<IOwnProps> = ({ closeModal }) => {
  const { avatarURL, token, name, email } = useTypedSelector(
    (state) => state.user
  );
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(name ? name : "");
  const [newEmail, setNewEmail] = useState(email ? email : "");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [confirmChanges, setConfirmChanges] = useState(false);
  const [confirmChangesPass, setConfirmChangesPass] = useState("");

  const dispatch = useTypedDispatch();

  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    setError("");
    setSuccess("");

    if (user) {
      try {
        await updateProfile(user, { displayName });

        const updatedUser = {
          ...initialState,
          name: user.displayName,
          email: user.email,
          id: user.uid,
          createDate: user.metadata.creationTime,
          avatarURL: avatarURL,
          token: token,
        };
        dispatch(setUser(updatedUser));
        setSuccess("Profile updated successfully!");
      } catch (error: any) {
        setError("Failed to update profile: " + error.message);
      }
    }
  };

  const handleUpdateEmail = async () => {
    setError("");
    setSuccess("");

    if (user && user.email) {
      try {
        await signOut(auth);

        await updateEmail(user, newEmail);

        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          confirmChangesPass
        );

        const updatedUser = {
          ...initialState,
          name: userCredential.user.displayName,
          email: newEmail,
          id: userCredential.user.uid,
          createDate: userCredential.user.metadata.creationTime,
          avatarURL: avatarURL,
          token: token,
        };
        dispatch(setUser(updatedUser));
        navigate("/profile");

        setSuccess("Email updated successfully!");
      } catch (error: any) {
        console.log(error, "error");
      }
    }
  };

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

    onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          await signOut(auth);

          await updateEmail(user, newEmail);
          const credentials = EmailAuthProvider.credential(
            user.email,
            confirmChangesPass
          );
          await reauthenticateWithCredential(user, credentials);

          await updatePassword(user, newPassword);

          const userCredential = await signInWithEmailAndPassword(
            auth,
            user.email,
            newPassword
          );

          const updatedUser = {
            ...initialState,
            name: userCredential.user.displayName,
            email: user.email,
            id: userCredential.user.uid,
            createDate: userCredential.user.metadata.creationTime,
            avatarURL: avatarURL,
            token: token,
          };
          dispatch(setUser(updatedUser));

          navigate("/profile");
          setSuccess("Password updated successfully!");
        } catch (error: any) {
          setError("Failed to update password: Wrong password");
        }
      }
    });
  };

  const saveAllChanges = async () => {
    if (email !== newEmail) {
      handleUpdateEmail();
      setError("");
    }
    if (
      newPassword !== "" ||
      error === "Failed to update password: Wrong password"
    ) {
      if (newPassword === repeatedPassword) {
        setConfirmChanges(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (confirmChanges) {
          handleUpdatePassword();
          console.log("CHANGE PASSS");
        }
      } else {
        setError("Passwords do not match");
      }
    }
    if (displayName !== name) {
      handleUpdateProfile();
    }
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  return (
    <div className="Profile_Edit">
      <div className="Edit_Title">
        <TitleSite />
      </div>

      <div className="Edit_Wrapper">
        <AvatarUploader />
        <div className="Edit_Inputs">
          {success && <p className="SuccessMessage">{success}</p>}
          {error && <p className="ErrorMessage">Error: "{error}"</p>}
          <div className="InputWrapper">
            <label className="InputLabel">Display Name:</label>
            <div className="InputContainer">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="InputWrapper_Input"
              />
              <span className="ConfirmIcon" onClick={handleUpdateProfile}>
                <GiConfirmed />
              </span>
            </div>
          </div>

          <div className="InputWrapper">
            <label className="InputLabel">New Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="InputWrapper_Input"
            />
          </div>

          <div className="InputWrapper">
            <label className="InputLabel">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="InputWrapper_Input"
            />
          </div>

          <div className="InputWrapper">
            <label className="InputLabel">Repeat Password:</label>
            <input
              type="password"
              value={repeatedPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="InputWrapper_Input"
            />
          </div>

          {confirmChanges ? (
            <div className="InputWrapper">
              <label className="InputLabel">Confirm changes:</label>
              <input
                type="password"
                onChange={(e) => setConfirmChangesPass(e.target.value)}
                placeholder="Enter your current password"
                className="InputWrapper_Input"
              />
              <button
                className="SaveChangesButton iButton"
                onClick={saveAllChanges}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="Edit_SaveChange">
              <button
                className="SaveChangesButton iButton"
                onClick={saveAllChanges}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <span className="CloseIcon" onClick={closeModal}>
        <AiOutlineCloseCircle />
      </span>
    </div>
  );
};
export default ProfileEdit;
