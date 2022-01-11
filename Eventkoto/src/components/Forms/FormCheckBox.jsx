

export function FormCheckbox({title, value, setValue}){

    return (
        <div>
            <label className="text-gray-700">
                <input type="checkbox" checked={value} value={value} onChange={e => setValue(!value)}/>
                <span className="ml-1">{title}</span>
            </label>
        </div>
    )
}