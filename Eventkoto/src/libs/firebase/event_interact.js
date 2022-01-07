import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { attendance_db_address, FireDBAttendance } from "./db_attendance";
import { FireDBInterested, interesteds_db_address } from "./db_interested";
import { FireDBRatings, ratings_db_address } from "./db_ratings";
import { app } from "./init";

const db = getFirestore(app);

export const FireEventInteraction = {
  data: {
    interested : FireDBInterested.data.interestedTemplate,
    attendance : FireDBAttendance.data.attendanceTemplate,
    rating : FireDBRatings.data.ratingsTemplate
  },
  check: async (what, data) => {
    try {
      const q = query(
        collection(db, what),
        where(`user_id`, "==", data.user_id),
        where(`event_id`, "==", data.event_id)
      );
      let res = await getDocs(q);
      return (!res.empty) 
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  toggleInterested: async (data) => {
    try {
      const q = query(
        collection(db, interesteds_db_address),
        where(`user_id`, "==", data.user_id),
        where(`event_id`, "==", data.event_id)
      );
      let res = await getDocs(q);
      if (res.empty){
        return await FireDBInterested.create(data)
      } 
      else{
        res.forEach(async (e) => {
            await FireDBInterested.delete(e.id)
        })
        return 2
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
  },
  toggleAttendance: async (data) => {
    try {
      const q = query(
        collection(db, attendance_db_address),
        where(`user_id`, "==", data.user_id),
        where(`event_id`, "==", data.event_id)
      );
      let res = await getDocs(q);
      if (res.empty){
        return await FireDBAttendance.create(data)
      } 
      else{
        res.forEach(async (e) => {
            await FireDBAttendance.delete(e.id)
        })
        return 2
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
  },
  rate: async (data) => {
    try {
      const q = query(
        collection(db, ratings_db_address),
        where(`user_id`, "==", data.user_id),
        where(`event_id`, "==", data.event_id)
      );
      let res = await getDocs(q);
      if (res.empty){
        return await FireDBRatings.create(data)
      } 
      else{
        res.forEach(async (e) => {
            console.log(e.id)
            console.log(data)
            await FireDBRatings.update(e.id, {ratings : data.ratings})
        })
        return 2
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
  },
};
