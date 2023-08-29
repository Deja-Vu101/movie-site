import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { updateProfileDataInFirestore } from "../../updatesProfile/updateUser";
import { setUserAvatar } from "../../store/slices/userSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";

interface IOwnProps {
  closeModal: () => void;
  setAvatarURL: (url: string) => void;
}

const AvatarUploader = () => {
  const dispatch = useTypedDispatch();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const storage = getStorage();

  const handleUpload = async (selectedFile: any) => {
    if (selectedFile) {
      const storageRef = ref(storage, `avatars/${currentUser?.uid}`);
      await uploadBytes(storageRef, selectedFile);

      const photoURL = await getDownloadURL(storageRef);

      if (currentUser) {
        try {
          await updateProfile(currentUser, {
            photoURL: photoURL,
          });
          console.log("Аватарка оновлена!");
          dispatch(setUserAvatar(photoURL));
        } catch (error) {
          console.error("Помилка при оновленні аватарки:", error);
        }
      } else {
        console.log("Користувач не автентифікований.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e: any) => handleUpload(e.target.files[0])}
      />
      {/*<button onClick={handleUpload}>Upload</button>*/}
    </div>
  );
};
export default AvatarUploader;

//const AvatarEditor: React.FC<IOwnProps> = ({ closeModal, setAvatarURL }) => {
//  const dispatch = useTypedDispatch();
//  const auth = getAuth();
//  const currentUser = auth.currentUser;
//  const storage = getStorage();

//  const [selectedFile, setSelectedFile] = useState(null);

//  const handleFileChange = (e: any) => {
//    setSelectedFile(e.target.files[0]);
//  };
//  const handleUpload = async () => {
//    if (selectedFile) {
//      const storageRef = ref(storage, `avatars/${currentUser?.uid}`);
//      await uploadBytes(storageRef, selectedFile);

//      const photoURL = await getDownloadURL(storageRef);

//      if (currentUser) {
//        try {
//          await updateProfile(currentUser, {
//            photoURL: photoURL,
//          });

//          dispatch(setUserAvatar(photoURL));
//          await updateProfileDataInFirestore(currentUser.uid, {
//            avatarURL: photoURL,
//          });

//          console.log("Аватарка оновлена!");
//          closeModal();
//        } catch (error) {
//          console.error("Помилка при оновленні аватарки:", error);
//        }
//      } else {
//        console.log("Користувач не автентифікований.");
//      }
//    }
//  };
//  return (
//    <div>
//      <input type="file" onChange={handleFileChange} />
//      <button onClick={handleUpload}>Upload</button>
//    </div>
//  );
//};

//export default AvatarEditor;
