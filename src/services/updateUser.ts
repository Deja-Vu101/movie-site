import { doc, updateDoc } from "firebase/firestore";
import { db } from "../apiConfigs/firebase";

export const updateProfileDataInFirestore = async (userId: any, dataToUpdate: any) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, dataToUpdate);
    console.log("Дані користувача оновлені в Firestore.");
  } catch (error) {
    console.error("Помилка при оновленні даних користувача:", error);
  }
};
