import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { account_db_address, FireDBAccount } from "./db_account";
import { FireDBAttendance } from "./db_attendance";
import { FireDBInterested } from "./db_interested";
import { FireDBRatings } from "./db_ratings";
import { FireFiles } from "./file";
import { app } from "./init";

const db = getFirestore(app);
const db_address = "Events";

export const events_db_address = db_address;

function docAddress(id){
  return doc(db, db_address, id)
}

export const FireDBRawEvents = {
  data : {
    eventTemplate : (creator, title, organization, overview, event_date, schedules, details, categories, splash_image, event_images) => {
      return {
        creator, title, organization, overview, event_date, schedules, details, categories, splash_image, event_images
      }
    },
  },
  create: async (data) => {
    try {
      // upload the images first
      if(data.splash_image){
        let splash_image = data.splash_image
        let sp = await FireFiles.uploadFile(splash_image.name, splash_image)
        data.splash_image = sp.link
      }

      if(data.event_images){
        let event_images = data.event_images
        let ei = await FireFiles.uploadFiles(event_images)
        data.event_images = ei.map(e => e.link)
      }

      if (data.creator){ 
        data.creator = doc(db, account_db_address, data.creator)
      }

      // Then create the collection
      await addDoc(collection(db, db_address),{
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
  readAll: async (amount=100) => {
    try {
      const q = query(collection(db, db_address), orderBy("created_at", "desc"), limitToLast(amount));
      const querySnapshot = await getDocs(q);
      // Parsing the data
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), uid: doc.id});
      });
      return data
      
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
  readQuery: async (...qs) => {
    try {
      const q = query(collection(db, db_address), ...qs);
      const querySnapshot = await getDocs(q);
      // Parsing the data
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), uid: doc.id});
      });
      return data
      
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  },
};

export const FireDBQueryEvents = {
  getOne : async (id, get_creator=true, load_ratings=true ,load_interested=true, load_attendance=true) => {
    // Qyery the main Data
    let d = await FireDBRawEvents.readOne(id)
    let data = {...d.data(), uid: d.id}
    //data.creator = data.creator.get()

    if (data.creator){
      if (get_creator){
        let d = await FireDBAccount.readOne(data.creator.id)
        data.creator = d.data()
      }
      else{
        data.creator = data.creator.id
      }
    }

    if(load_ratings){
      // Query the count of interested
      let rawRatingsList = await FireDBRatings.query(d.id)
      const ratingsList = [];
      rawRatingsList.forEach((doc) => {
        ratingsList.push({...doc.data(), uid: doc.id});
      });
      data.ratings_list = ratingsList
      data.ratings = 0
      if (ratingsList.length > 0){
        data.ratings = ratingsList.reduce((pV, cV)=> pV += cV.ratings, 0) / ratingsList.length
      }
    }

    if(load_interested){
      // Query the count of interested
      let rawInterestedList = await FireDBInterested.query(d.id)
      const interestedList = [];
      rawInterestedList.forEach((doc) => {
        interestedList.push({...doc.data(), uid: doc.id});
      });
      data.interested = interestedList
      data.interested_count = interestedList.length
    }

    if(load_attendance){
      // Query the count of interested
      let rawAttendanceList = await FireDBAttendance.query(d.id)
      const attendanceList = [];
      rawAttendanceList.forEach((doc) => {
        attendanceList.push({...doc.data(), uid: doc.id});
      });
      data.attendance = attendanceList
      data.attendance_count = attendanceList.length
    }

    return data
  },
  getLatestAll : async (amount=100) => {
    return await FireDBRawEvents.readAll(amount)
  },
  getLatestCategory : async (category, amount=100) => {
    return await FireDBRawEvents.readQuery(where("categories", "array-contains", category), limit(amount))
  }
}