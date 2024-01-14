import { doc, updateDoc } from "firebase/firestore";
import { db } from "../apiConfigs/firebase";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { setUserAvatar } from "../store/slices/userSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const updateProfileDataInFirestore = async (
  userId: any,
  dataToUpdate: any
) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, dataToUpdate);
    console.log("Дані користувача оновлені в Firestore.");
  } catch (error) {
    console.error("Помилка при оновленні даних користувача:", error);
  }
};

export const fetchAvatarDataStorage = async (
  uid: string,
  dispatch: Dispatch
) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `avatars/${uid}`);
    const photoURL = await getDownloadURL(storageRef);

    dispatch(setUserAvatar(photoURL));
  } catch (error) {
    setUserAvatar("");
    console.error(error, "error fetchAvatarDataStorage");
  }
};
