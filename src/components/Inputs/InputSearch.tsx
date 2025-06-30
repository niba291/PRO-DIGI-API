interface Props {
    id?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    textLabel?: string;
    textButton?: string;
    setValue?: (props : any) => void;
    onClick?: (props : any) => void;
}

export const InputSearch = ({
    id = "txtSearch",
    placeholder = "Ej. Agumon, 001...",
    className = "",
    value = "",
    textLabel = "Nombre o ID",
    textButton = "Buscar",
    setValue,
    onClick
}: Props) => {

    const handleOnChangeInputSearch = (e : any) => {
        setValue?.(e?.target?.value?.trim());
    }

    return (
        <div className="flex flex-wrap mb-6">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-semibold w-full"
            >
                {textLabel}
            </label>
            <input
                id={id}
                value={value}
                placeholder={placeholder}
                className={`flex-grow px-4 py-2 rounded-l bg-white text-gray-800 focus:outline-none border-1 border-black ${className}`}
                onChange={handleOnChangeInputSearch}
            />
            <button
                onClick={onClick}
                className="bg-blue-400 text-gray-900 px-4 py-2 rounded-r font-semibold hover:bg-black hover:text-blue-400"
            >
                {textButton}
            </button>
        </div>
    );
};