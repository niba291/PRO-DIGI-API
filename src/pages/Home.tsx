import { useState, useEffect, useRef } from "preact/hooks";

import { Filter, type ItemProps } from "@components/Filter/Filter";
import { InputSearch } from "@components/Inputs/InputSearch";
import { CardDigimon } from "@components/Card/CardDigimon";
import { CardRotating } from "@components/Card/CardRotating";

import { Cards } from "@assets/Icons/Cards";

import { getRandom } from "@utils/getRandom";

import { getDigimon, getList } from "@services/digimonApi";

import type { IDigimon } from "@typings/digimon";
import type { Props as PropsCard } from "@typings/card";

import { attributes } from "@constants/attributes";
import { level } from "@constants/level";

export const Home = () => {
    const [list, setList] = useState<PropsCard[]>([]);
    const [digimon, setDigimon] = useState<IDigimon | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const card = useRef<HTMLDivElement>(null);

    const handleSearch = async (search : string = "") => {
        if (!search.trim()) return;

        setLoading(true);

        try {
            const result = await getList({
                name: search.trim(),
                page: 0,
            });
            setList(result?.content ?? []);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };

    const handleOnClick = async (id: string = "") => {
        try {
            const result = await getDigimon(id);
            setDigimon(result);
            setIsVisible(true);
        } catch (e) {
            console.error(e);
        }
    };

    const handleOnRefresh = () => {
        getListDigimon();
    };

    const getListDigimon = async (props : {
        attribute?: string,
        level?: string,
        xAntibody?: boolean
    } = {}) => {
        setLoading(true);
        const list = await getList(props);
        setList(list?.content);
        setLoading(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (card.current && !card.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        getListDigimon();
        handleOnClick(Math.floor(getRandom(1, 1488)).toString());
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <section className="relative w-full md:pt-30 pt-24 text-white text-center px-6">
                    {/* <h1 className="lg:text-2xl font-bold mb-4">
                        ¡Ey, Tamer Explora el mundo digital aquí!
                    </h1> */}
                    <div className="flex flex-wrap w-full gap-4">
                        <InputSearch
                            onChange={handleSearch}
                            classNameContent="w-[calc(100%-3.5rem)]"
                        />
                        <button
                            onClick={handleOnRefresh}
                            // className="cursor-pointer w-[1.85rem] h-[1.85rem] md:w-10 md:h-10 flex justify-center items-center text-lg text-bold bg-gradient-to-r from-teal-300 via-gray-600 to-teal-800 text-white rounded-full transition"
                            className="cursor-pointer w-[1.85rem] h-[1.85rem] md:w-10 md:h-10 flex justify-center items-center text-lg text-bold bg-gradient-to-r backdrop-blur-lg text-white rounded-full transition border hover:text-teal-400"
                        >
                            <Cards/>
                        </button>
                        <Filter handleGetList={getListDigimon} attributes={attributes as unknown as ItemProps[]} levels={level as unknown as ItemProps[]}/>
                    </div>
                </section>

                <section className="flex flex-1 overflow-hidden">
                    {loading ? (
                        <div className={"flex justify-center items-center w-full h-full"}>
                            <img src={`${import.meta.env.BASE_URL}/Digimons/loading.gif`} alt="loading" class={"w-50"} />
                        </div>
                    ) : (
                        <CardRotating list={list} onClick={handleOnClick}/>
                    )}
                </section>
            </div>
            <section className={`${!isVisible ? "hidden" : ""} md:block absolute lg:relative z-10 md:w-1/2 w-full p-4 py-28 flex flex-wrap justify-center items-center bg-black/50 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none rounded-lg h-full`}>
                {/* <button
                    onClick={() =>
                        handleOnClick(
                            Math.floor(getRandom(1, 1488)).toString()
                        )
                    }
                    className="cursor-pointer px-20 py-2 text-lg text-bold bg-gradient-to-r from-teal-300 via-gray-600 to-teal-800 text-white rounded-lg transition"
                >
                    ↻ Barajar Digimon
                </button> */}
                <div ref={card}>
                    <CardDigimon
                        {...digimon}
                        id={digimon?.id ?? 0}
                        name={digimon?.name ?? "---"}
                        image={digimon?.images?.[0]?.href as string}
                    />
                </div>
            </section>
        </>
    );
};
