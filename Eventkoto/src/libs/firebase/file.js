import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid"

const storage = getStorage();
const filesLoc = 'events'; 

// eslint-disable-next-line no-constant-condition
const log = true ? console.log : (e)=>{}

export const FireFiles ={
    uploadFile : async (fileName, file) => {
        const storageRef = ref(storage, `${filesLoc}/${uuid().replaceAll("-","_")}_${fileName.replaceAll("/","_")}`);
        try {
            let d = await uploadBytes(storageRef, file);
            let durl = await getDownloadURL(storageRef)
            return {...d, link: durl}
        }
        catch(e){
            log(e)
            return false
        }
    },
    uploadFiles : async (files) => {
        let toRet = [];
        try {
            for(let i=0; i<files.length; i++){
                let storageRef = ref(storage, `${filesLoc}/${uuid().replaceAll("-","_")}_${files[i].name.replaceAll("/","_")}`);
                
                let d = await uploadBytes(storageRef, files[i]);
                let durl = await getDownloadURL(storageRef)

                toRet.push({...d, link: durl})
            }
            return toRet
        }
        catch(e){
            log(e)
            return false
        }
    },
}

