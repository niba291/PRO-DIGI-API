import { useState, useEffect } from "preact/hooks";

import { CardDigimon } from "@components/Card/CardDigimon";
import { SoftCardDigimon, type Props as PropsSoftCardDigimon } from "@components/Card/SoftCardDigimon";
import { Filter } from "@components/Filter/Filter";
import { InputSearch } from "@components/Inputs/InputSearch";

import { getRandom } from "@utils/getRandom";

import { getDigimon, getList } from "@services/digimonApi";

import type { IDigimon } from "../types/digimon";

export const Home = () => {
    const [search, setSearch] = useState("");
    const [list, setList] = useState<PropsSoftCardDigimon[]>([]);
    const [digimon, setDigimon] = useState<IDigimon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!search.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getList({
                "name": search.trim(),
                "page": 0
            });
            setList(result?.content ?? []);
        } catch (e) {
            setError("No se encontró el Digimon buscado.");
        } finally {
            setLoading(false);
        }
    };

    const handleOnClick = async (id : string = "") => {
        try {
            const result = await getDigimon(id);
            setDigimon(result);
        } catch (e) {
            console.error(e);
            setError("No se encontró el Digimon buscado.");
        }
    };

    const handleOnRefresh = () => {
        getListDigimon();
    };

    const getListDigimon = async () => {
        setLoading(true);
        const list = await getList();
        setList(list?.content);
        setLoading(false);
    };    

    useEffect(() => {
        getListDigimon();
        handleOnClick(Math.floor(getRandom(1, 1488)).toString());
    }, []);

    return (
        <>
            <section
                className="relative z-20 basis-1/5 bg-center bg-cover bg-no-repeat py-30 p-4 text-white"
                // style={{
                //     backgroundImage: 'url("/Digimons/section32.webp")',
                // }}
            >
                <h1 className="text-2xl font-bold mb-4">
                    ¡Ey, Tamer! <br />
                    ¡Explora el mundo digital aquí!
                </h1>
                <div className="mb-8 flex justify-center items-center w-full">
                    <button onClick={handleOnRefresh} className="cursor-pointer px-20 py-2 text-lg text-bold bg-gradient-to-r from-teal-300 via-gray-600 to-teal-800 text-white rounded-lg transition">
                        ↻ Barajar Tablero
                    </button>
                </div>
                <InputSearch
                    setValue={setSearch}
                    value={search}
                    onClick={handleSearch}
                />

                {/* {loading && <p className="text-white">Cargando...</p>}
                {error && (
                    <p className="text-red-500 font-semibold">{error}</p>
                )}

                {digimon && (
                    <div className="mt-4 bg-white rounded p-4 shadow-md text-gray-800">
                        <h2 className="text-lg font-bold mb-2">
                            {digimon.name}
                        </h2>
                        {digimon.images[0] && (
                            <img
                                src={digimon.images[0].href}
                                alt={digimon.name}
                                className="w-32 h-auto mb-2"
                            />
                        )}
                        <p className="text-sm">
                            Niveles:{" "}
                            {digimon.levels
                                .map((lvl) => lvl.level)
                                .join(", ") || "N/A"}
                        </p>
                        <p className="text-sm">
                            Tipos:{" "}
                            {digimon.types.map((t) => t.type).join(", ") ||
                                "N/A"}
                        </p>
                        <p className="text-sm">
                            Atributos:{" "}
                            {digimon.attributes
                                .map((a) => a.attribute)
                                .join(", ") || "N/A"}
                        </p>
                    </div>
                )} */}

                <Filter/>
            </section>

            <section className="relative z-20 flex-1 p-4 pt-20 flex flex-col justify-start items-center max-h-[94vh] overflow-hidden">
                <div className="grid grid-cols-6">
                    {loading ? (
                        <div className={"text-9xl text-white"}>Loading</div>
                    ) : 
                        list.map((digimon) => (
                            <button className={"cursor-pointer scale-65 -mb-20 -mt-6"} onClick={() => handleOnClick(digimon.id.toString())}>
                                <CardDigimon {...digimon} />
                            </button>
                        ))
                    }
                </div>
            </section>

            <section
                className="relative z-20 basis-1/5 bg-center bg-cover bg-no-repeat p-4 py-28 flex flex-wrap justify-center items-center"
                // style={{
                //     backgroundImage: 'url("/Digimons/section1.webp")',
                // }}
            >
                    <button onClick={() => handleOnClick(Math.floor(getRandom(1, 1488)).toString())} className="cursor-pointer px-20 py-2 text-lg text-bold bg-gradient-to-r from-teal-300 via-gray-600 to-teal-800 text-white rounded-lg transition">
                        ↻ Barajar Digimon
                    </button>
                    <CardDigimon {...digimon} id={digimon?.id ?? 0} name={digimon?.name ?? "---"} image={(digimon?.images?.[0]?.href as string)} />
            </section>
        </>
    );
};
