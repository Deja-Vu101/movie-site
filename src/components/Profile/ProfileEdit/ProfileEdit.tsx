import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
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
  const [confirmPassword, setConfirmPassword] = useState("");
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
        setSuccess("Profile updated successfully!");
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
        setError("Failed to update email: " + error.message);
      }
    }
  };

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

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
        setError("Failed to update password: " + error.message);
      }
    }
  };

  const saveAllChanges = () => {
    if (newEmail !== email || newPassword !== "") {
      if (confirmChanges) {
        handleUpdateEmail();
        handleUpdatePassword();
      }
      setConfirmChanges(true);
    } else {
      handleUpdateProfile();
    }
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  return (
    <div
      style={{
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        gap: "30px",
      }}
    >
      <div className="Edit_Avatar" style={{ marginBottom: "20px" }}>
        <TitleSite />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <AvatarUploader />
        <div className="Edit_Inputs">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white" }}>Display Name: </label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <span
                style={{
                  fontSize: "25px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  marginTop: "8px",
                }}
                onClick={handleUpdateProfile}
              >
                <span style={{ cursor: "pointer" }}>
                  <GiConfirmed />
                </span>
              </span>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white" }}>New Email: </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white" }}>New Password: </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white" }}>Repeat Password: </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {confirmChanges ? (
            <div>
              <div className="Edit_Inputs">
                <label style={{ color: "white" }}>Confirm changes: </label>
                <input
                  type="password"
                  onChange={(e) => setConfirmChangesPass(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>
              <button
                className="Header_Profile"
                style={{ marginTop: "20px" }}
                onClick={saveAllChanges}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button className="Header_Profile" onClick={saveAllChanges}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      <span
        style={{
          fontSize: "35px",
          position: "absolute",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={closeModal}
      >
        <AiOutlineCloseCircle />
      </span>
    </div>
  );
};
export default ProfileEdit;
