import ReactQuill from "react-quill";

export function FormTextAreaMinimal({ title, value, setValue=e=>console.log(e), placeholder }) {

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="mt-1">
        <ReactQuill
          value={value}
          onChange={e => setValue(e)}
          modules={{}}
          formats={[]}
          theme="bubble"
          placeholder={placeholder}
          className="shadow-sm bg-white  outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full  text-base border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}
