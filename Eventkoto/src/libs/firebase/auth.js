import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FireDBAccount } from "./db_account";
import { FireDBAttendance } from "./db_attendance";
import { FireDBInterested } from "./db_interested";
import { FireDBRatings } from "./db_ratings";
import { app } from "./init";

const auth = getAuth(app);

// eslint-disable-next-line no-constant-condition
let log = true ? console.log : (e) => {};

export const FireAuth = {
  data: {
    accountData: {
      viewer: (name, email, program, organization, student_id) => {
        return {
          name,
          email,
          program,
          organization,
          student_id,
          type: 0,
        };
      },
      orgs: (name, email, program, organization, student_id) => {
        return {
          name,
          email,
          program,
          organization,
          student_id,
          type: 1,
        };
      },
    },
  },
  getUser: async (load_ratings=false ,load_interested=false, load_attendance=false) => {
    try {
      if (!(auth.currentUser)) return false

      // Load base data
      let d = await FireDBAccount.readOne(auth.currentUser.uid)
      let data = d.data()

      if(load_ratings){
        // Query the count of interested
        let rawRatingsList = await FireDBRatings.query(auth.currentUser.uid, "user")
        const ratingsList = [];
        rawRatingsList.forEach((doc) => {
          ratingsList.push({...doc.data(), uid: doc.id});
        });
        data.ratings_list = ratingsList
        data.ratings_count = ratingsList.length
      }
  
      if(load_interested){
        // Query the count of interested
        let rawInterestedList = await FireDBInterested.query(auth.currentUser.uid, "user")
        const interestedList = [];
        rawInterestedList.forEach((doc) => {
          interestedList.push({...doc.data(), uid: doc.id});
        });
        data.interested = interestedList
        data.interested_count = interestedList.length
      }
  
      if(load_attendance){
        // Query the count of interested
        let rawAttendanceList = await FireDBAttendance.query(auth.currentUser.uid, "user")
        const attendanceList = [];
        rawAttendanceList.forEach((doc) => {
          attendanceList.push({...doc.data(), uid: doc.id});
        });
        data.attendance = attendanceList
        data.attendance_count = attendanceList.length
      }

      return {...data, uid: auth.currentUser.uid, email_verified: auth.currentUser.emailVerified}
    }
    catch(e){
      return false
    }
  },
  loginUser: async (email, password, resultCB = (e) => log(e)) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        resultCB(userCredential);
        // ...
      })
      .catch((error) => {
        resultCB(error);
      });
  },
  registerUser: async (email, password, accountData, resultCB = (e) => log(e)) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try{
          // Send Email Verification
          //sendEmailVerification(userCredential.user);
          // Create the Account Information
          await FireDBAccount.create(userCredential.user.uid, accountData)
          // Signed in
          resultCB(userCredential);
        }
        catch(e){
          console.error(e)
          resultCB(e);
        }
      })
      .catch((error) => {
        resultCB(error);
        // ..
      });
  },
  logoutUser: async () => {
    signOut(auth);
  },
  hookAccount: async (callback = log) => {
    onAuthStateChanged(auth, callback);
  },
  resetPassword: async (email, resultCB = (e) => log(e)) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        resultCB(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        
        resultCB(false)
    });
  },
};
