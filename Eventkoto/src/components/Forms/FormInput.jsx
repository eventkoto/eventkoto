

export function FormInput({title, value, setValue, placeholder, big}){

    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
            <input
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                type="text"
                className={`mt-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm ${big ? 'text-4xl' : 'text-lg'} border-gray-300 border rounded-md font-bold`}
            />
        </div>
    )
}