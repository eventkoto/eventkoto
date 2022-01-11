import { useState } from "react";

export function FormFilePick({title, holderImage, setValue=e=>console.log(e), 
    accept="image/gif, image/jpeg, image/png"}){

    const [prevImg, setPrevImg] = useState(false)

    function handleData(e) {
        //console.log(e.target.files);
        const image = e.target.files[0];
        if (image) {
            //console.log(image);
            setValue(image);
            let reader = new FileReader();
            reader.onload = (e) => {
                setPrevImg(e.target.result);
            };
            reader.readAsDataURL(image);
        }
    }
    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
            {(prevImg || holderImage) && <img src={(prevImg || holderImage)} alt="preview" className="w-full" />}
            <input
                onChange={handleData}
                type="file"
                accept={accept}
                className="mt-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 border rounded-md"
            />
        </div>
    )
}