

export function FormTime({title, value, setValue}){

    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                type="datetime-local"
                className="mt-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  text-base border-gray-300 border rounded-md"
            />
        </div>
    )
}