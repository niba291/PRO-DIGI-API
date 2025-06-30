export const Filter = () => {
    return (
        <details 
            className={`rounded-lg group w-full bg-white text-black text-center cursor-pointer py-3 [clip-path:polygon(0%_0%,100%_0%,100%_75%,80%_75%,75%_100%,25%_100%,20%_75%,0%_75%)] text-xs flex flex-col-reverse justify-center`}
        >
            <summary className={"list-none cursor-pointer select-none font-semibold"}>
                <span className="group-open:hidden">▼ Mostrar búsqueda avanzada</span>
                <span className="hidden group-open:inline">▲ Ocultar búsqueda avanzada</span>
            </summary>
            <div className="text-sm select-text py-5 pb-8">
                Aquí el contenido desplegable...
            </div>
        </details>
    );
}