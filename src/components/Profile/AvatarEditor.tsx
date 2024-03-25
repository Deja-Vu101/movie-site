import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRef } from "react";
import { updateProfile } from "firebase/auth";
import { setUserAvatar } from "../../store/slices/userSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbEdit } from "react-icons/tb";
import "../Profile/profile.scss";

const AvatarUploader = () => {
  const { avatarURL } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const storage = getStorage();

  const handleUpload = async (selectedFile: any) => {
    if (selectedFile) {
      const storageRef = ref(storage, `avatars/${currentUser?.uid}`);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await uploadBytes(storageRef, selectedFile);

          const photoURL = await getDownloadURL(storageRef);
          console.log(user, "currentUser");
          console.log(photoURL, "photoURL");
          try {
            await updateProfile(user, {
              photoURL: photoURL,
            });
            console.log("The avatar has been updated!");
            dispatch(setUserAvatar(photoURL));
          } catch (error) {
            console.error("Error updating avatar:", error);
          }
        } else {
          console.log("The user is not authenticated.");
        }
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="Avatar_Wrapper">
        <div className="Avatar_Content">
          <img
            src={
              avatarURL !== ""
                ? avatarURL
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
            }
            alt="Avatar"
            className="Avatar_Img"
          />
        </div>

        <div className="Profile_AvatarEdit" onClick={handleUploadClick}>
          <TbEdit />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e: any) => handleUpload(e.target.files[0])}
        />
      </div>
    </div>
  );
};
export default AvatarUploader;
