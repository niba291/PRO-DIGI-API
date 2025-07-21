import { useState, useEffect } from "preact/hooks";

export interface ItemProps {
    id: string;
    name: string;
    href: string;
}

export interface Props {
    handleGetList?: (props?: any) => void;
    attributes? : ItemProps[];
    levels? : ItemProps[];
};

export const Filter = ({
    handleGetList,
    attributes : attributes = [],
    levels : levels = []
} : Props) => {

    const [attribute, setAttributes]    = useState<string>("All");
    const [level, setLevel]    = useState<string>("All");
    const [xAntibody, setXAntibody]     = useState<boolean>(false);

    useEffect(() => {

        const auxJson : any = {
            xAntibody: xAntibody,
        };

        if(attribute !== "All"){
            auxJson["attribute"] = attribute;
        }

        if(level !== "All"){
            auxJson["level"] = level;
        }

        handleGetList?.(auxJson);
    }, [attribute, level, xAntibody]);

    return (
        <div className="relative w-full">
            <div className="absolute rounded-lg w-full border border-teal-400 bottom-[calc(10%-1px)]" />
            <details 
                className={`relative z-10 rounded-lg group backdrop-blur-lg open:border-b-0 text-white border open:border-teal-400 text-center cursor-pointer py-3 open:[clip-path:polygon(0_90%,0_0,100%_0,100%_90%,80%_90%,75%_100%,25%_100%,20%_90%)] md:open:[clip-path:polygon(0_90%,0_0,100%_0,100%_90%,70%_90%,65%_100%,35%_100%,30%_90%)] text-xs flex flex-col-reverse justify-center`}
            >
                <summary className={"list-none cursor-pointer select-none font-semibold"}>
                    <span className="group-open:hidden">▼ Mostrar búsqueda avanzada</span>
                    <span className="hidden group-open:inline">▲ Ocultar búsqueda avanzada</span>
                </summary>
                <div className="text-sm select-text py-5 pb-8 flex justify-center md:gap-45 gap-5">
                    <ListFilters id="attributes" list={attributes} value={attribute} setValue={setAttributes}/>
                    <ListFilters id="level" list={levels} value={level} setValue={setLevel}/>
                    <div className={"flex flex-col text-start"}>
                        <label htmlFor={`cbxxAntibody`} className={"w-full flex items-center gap-5"}>
                            <input type="checkbox" id={"cbxxAntibody"} className={"accent-teal-400"} onChange={(event : any) => setXAntibody(event.target.checked)}/>
                                xAntibody
                        </label>
                    </div>
                </div>
            </details>
        </div>
    );
}

interface ListProps {
    id: string;
    list: ItemProps[];
    value?: string;
    setValue?: (props : any) => void;
}

const ListFilters = ({
    id, 
    list,
    value,
    setValue
} : ListProps) => (
    <div className={"flex flex-col text-start"}>
        {list.map(({
            id : idElement = "",
            name,
        } : ItemProps) => (
            <label key={`${id}-${idElement}`} htmlFor={`cbx${id}-${idElement}`} className={"w-full flex items-center gap-5"}>
                <input type="radio" checked={value === name} name={`cbx${id}`} id={`cbx${id}-${idElement}`} value={name} className={"accent-teal-400"} onChange={(event : any) => setValue?.(event?.target?.value)}/>
                {name}
            </label>
        ))}
    </div>
);