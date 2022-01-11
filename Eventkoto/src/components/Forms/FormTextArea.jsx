import ReactQuill from "react-quill";

export function FormTextArea({ title, value, setValue=e=>console.log(e), placeholder }) {
  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="mt-1">
        <ReactQuill
          value={value}
          onChange={e => setValue(e)}
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="shadow-sm bg-white  outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full  text-base border border-gray-300 rounded-md h-full"
        />
      </div>
    </div>
  );
}
