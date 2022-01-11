import { useState } from "react";

export function FormFilePickMultiple({title, holderImg, setValue=e=>console.log(e), 
    accept="image/gif, image/jpeg, image/png"}){

    const [prevImg2, setPrevImg2] = useState(false)

    function handleData2(e) {
        console.log(e.target.files);
        if (e.target.files) {
            setValue(e.target.files);
          let disp = [];
    
          for (let i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            reader.onload = (ev) => {
              disp.push(ev.target.result);
              if (disp.length === e.target.files.length) {
                setPrevImg2(disp);
              }
            };
            reader.readAsDataURL(e.target.files[i]);
          }
        }
    }

    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
            <div className="flex flex-wrap">
                {(prevImg2||holderImg) &&
                    (prevImg2||holderImg).map((e, i) => <img key={`im_${i}`} src={e} alt="extras" className="w-1/2 h-96 object-cover" />)
                }
            </div>
            
            <input
                onChange={handleData2}
                type="file"
                multiple
                accept={accept}
                className="mt-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  text-base border-gray-300 border rounded-md"
            />
        </div>
    )
}