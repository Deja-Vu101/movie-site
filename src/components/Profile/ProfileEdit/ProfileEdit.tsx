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
import Modal from "react-modal";
import Header from "../../Header/Header";
import ProfileHeader from "../ProfileHeader";
import AvatarUploader from "../AvatarEditor";
import TitleSite from "../../Header/TitleSite";
import { GiConfirmed } from "react-icons/gi";

//const ProfileEdit = () => {
//  //  const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth();
//  const auth = getAuth();
//  const user = auth.currentUser;
//  const [displayName, setDisplayName] = useState("");
//  const [newEmail, setNewEmail] = useState("");
//  const [newPassword, setNewPassword] = useState("");
//  const [error, setError] = useState("");
//  const [success, setSuccess] = useState("");

//  //  const [confirm, setConfirm] = useState(false);

//  const dispatch = useTypedDispatch();
//  const { avatarURL, token } = useTypedSelector((state) => state.user);
//  const navigate = useNavigate();

//  useEffect(() => {
//    if (user) {
//      setDisplayName(user.displayName || "");
//    }
//  }, [user]);

//  const handleUpdateProfile = async () => {
//    setError("");
//    setSuccess("");

//    if (user) {
//      try {
//        await updateProfile(user, { displayName });
//        setSuccess("Profile updated successfully!");
//        const updatedUser = {
//          ...initialState,
//          name: user.displayName,
//          email: user.email,
//          id: user.uid,
//          createDate: user.metadata.creationTime,
//          avatarURL: avatarURL,
//          token: token,
//        };
//        dispatch(setUser(updatedUser));
//      } catch (error: any) {
//        setError("Failed to update profile: " + error.message);
//      }
//    }
//  };

//  const handleUpdateEmail = async () => {
//    setError("");
//    setSuccess("");

//    if (user && user.email) {
//      try {
//        await signOut(auth);

//        await updateEmail(user, newEmail);

//        const userCredential = await signInWithEmailAndPassword(
//          auth,
//          user.email,
//          "123456"
//        );

//        const updatedUser = {
//          ...initialState,
//          name: userCredential.user.displayName,
//          email: newEmail,
//          id: userCredential.user.uid,
//          createDate: userCredential.user.metadata.creationTime,
//          avatarURL: avatarURL,
//          token: token,
//        };
//        dispatch(setUser(updatedUser));
//        navigate("/profile");

//        setSuccess("Email updated successfully!");
//      } catch (error: any) {
//        setError("Failed to update email: " + error.message);
//      }
//    }
//  };

//  const handleUpdatePassword = async () => {
//    setError("");
//    setSuccess("");

//    if (user && user.email) {
//      try {
//        await signOut(auth);

//        await updateEmail(user, newEmail);
//        const credentials = EmailAuthProvider.credential(user.email, "qwerty");
//        await reauthenticateWithCredential(user, credentials);

//        await updatePassword(user, newPassword);

//        const userCredential = await signInWithEmailAndPassword(
//          auth,
//          user.email,
//          newPassword
//        );

//        const updatedUser = {
//          ...initialState,
//          name: userCredential.user.displayName,
//          email: user.email,
//          id: userCredential.user.uid,
//          createDate: userCredential.user.metadata.creationTime,
//          avatarURL: avatarURL,
//          token: token,
//        };
//        dispatch(setUser(updatedUser));

//        navigate("/profile");
//        setSuccess("Password updated successfully!");
//      } catch (error: any) {
//        setError("Failed to update password: " + error.message);
//      }
//    }
//  };
//  return (
//    <div>
//      <h2>Edit Profile</h2>
//      {error && <p style={{ color: "red" }}>{error}</p>}
//      {success && <p style={{ color: "green" }}>{success}</p>}

//      <div>
//        <label>Display Name</label>
//        <input
//          type="text"
//          value={displayName}
//          onChange={(e) => setDisplayName(e.target.value)}
//        />
//        <button onClick={handleUpdateProfile}>Update Profile</button>
//      </div>

//      <div>
//        <label>New Email</label>
//        <input
//          type="email"
//          value={newEmail}
//          onChange={(e) => setNewEmail(e.target.value)}
//        />
//        <button onClick={handleUpdateEmail}>Update Email</button>
//      </div>

//      <div>
//        <label>New Password</label>
//        <input
//          type="password"
//          value={newPassword}
//          onChange={(e) => setNewPassword(e.target.value)}
//        />
//        <button onClick={handleUpdatePassword}>Update Password</button>
//      </div>
//    </div>
//  );
//};

interface IOwnProps {}

const ProfileEdit: React.FC<IOwnProps> = () => {
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

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

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

  return (
    // <div>
    //   <h2>Edit Profile</h2>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {success && <p style={{ color: "green" }}>{success}</p>}

    //   <div>
    //     <label>Display Name</label>
    //     <input
    //       type="text"
    //       value={displayName}
    //       onChange={(e) => setDisplayName(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label>New Email</label>
    //     <input
    //       type="email"
    //       value={newEmail}
    //       onChange={(e) => setNewEmail(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label>New Password</label>
    //     <input
    //       type="password"
    //       value={newPassword}
    //       onChange={(e) => setNewPassword(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label>Confirm Password</label>
    //     <input
    //       type="password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //     />
    //   </div>

    //   <button onClick={handleUpdateProfile}>Update Profile</button>
    //   <button onClick={handleUpdateEmail}>Update Email</button>
    //   <button onClick={handleUpdatePassword}>Update Password</button>

    //   {/*{confirmPassword !== "" && confirmPassword === newPassword && (
    //     <button onClick={handleUpdatePassword}>Update Password</button>
    //   )}*/}
    // </div>
    <div
      style={{
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //  justifyContent: "center",
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
                <GiConfirmed />
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
            <label style={{ color: "white" }}>Confirm Password: </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/*<button
            onClick={handleUpdateProfile}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            Update Profile
          </button>*/}
          {/*<button
            onClick={handleUpdateEmail}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            Update Email
          </button>
          <button
            onClick={handleUpdatePassword}
            style={{ marginBottom: "10px" }}
          >
            Update Password
          </button>*/}
          {confirmChanges ? (
            <div>
              <input
                type="password"
                onChange={(e) => setConfirmChangesPass(e.target.value)}
                placeholder="Enter your password to confirm the changes"
                style={{ color: "black", fontSize: "15px" }}
              />
              <button onClick={saveAllChanges}>Save Changes</button>
            </div>
          ) : (
            <button onClick={saveAllChanges}>Save Changes</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileEdit;
