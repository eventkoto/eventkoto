import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./init";

const db = getFirestore(app);
const db_address = "Interesteds";
export const interesteds_db_address = db_address;

function docAddress(id){
  return doc(db, db_address, id)
}

export const FireDBInterested = {
  data : {
    interestedTemplate : (user_id, user_snap, user_name, event_id, event_snap, event_name) => {
      return {
        user_id, user_snap, user_name, event_id, event_snap, event_name
      }
    },
  },
  create: async (data) => {
    try {
      const q = query(collection(db, db_address), where(`user_id`, '==', data.user_id), where(`event_id`, '==', data.event_id));
      let res = await getDocs(q);
      if (!res.empty) return false

      // Snapshot filter to avoid data echoing
      data.event_snap = {
        title : data.event_snap.title,
        organization : data.event_snap.organization,
        event_date : data.event_snap.schedules[0] || data.event_snap.event_date,
        splash_image : data.event_snap.splash_image,
      }
      data.user_snap = {
        name : data.user_snap.name,
        email : data.user_snap.email,
        organization : data.user_snap.organization,
      }
      await addDoc(collection(db, db_address), {
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
  query: async (id, of_what="event") => {
    try {
      const q = query(collection(db, db_address), where(`${of_what}_id`, '==', id));
      return await getDocs(q);
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
};
