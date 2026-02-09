type InputType = {
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
    labelClass?: string;
    inputClass?: string;
    Icon?: any
    type: string | 'text'
    required: boolean | true
}

const Input = ({ value, onChange, placeholder, labelClass, inputClass, Icon, type, required }: InputType) => {
    return (
        <label className={`w-full input flex items-center bg-gray-800/45 px-4 rounded-lg ${labelClass}`}>
            <Icon className="text-primary w-5" />
            <input required={required} type={type} value={value} onChange={onChange} placeholder={placeholder} className={`rounded-none bg-transparent border-none input focus:outline-none ${inputClass}`} />
        </label>
    )
}

export default Input