import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./init";

const db = getFirestore(app);
const db_address = "Accounts";

export const account_db_address = db_address 

function docAddress(id){
  return doc(db, db_address, id)
}

export const FireDBAccount = {
  create: async (id, data) => {
    try {
      await setDoc(docAddress(id), {
        ...data,
        created_at: Date.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  update: async (id, data) => {
    try {
      return await updateDoc(docAddress(id), data);
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
  delete: async (id) => {
    try {
      return await deleteDoc(docAddress(id));
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
  readOne: async (id) => {
    try {
      return await getDoc(docAddress(id));
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
};
