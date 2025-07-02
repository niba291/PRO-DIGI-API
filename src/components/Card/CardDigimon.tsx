import { useMask } from "@hooks/useMask";
import { useParticles } from "@hooks/useParticles";
import { fieldGradients } from "@utils/gradiants";
import type { IDigimon } from "@typings/digimon";

export const CardDigimon = ({
    id,
    name,
    descriptions,
    fields,
    levels,
    types,
    attributes,
    image
} : IDigimon) => {
    const src = image ?? "https://digi-api.com/images/digimon/w/Hi-Commandramon.png";
    const text : string[] = ["00100", "11000", "10101", "10011"];
    const canvasRef = useMask({ src });
    const canvasParticlesRef = useParticles({ text });
    const fieldSelectedGradiant = fieldGradients[fields?.[0]?.id || 1];
    const isMini = descriptions === undefined;

    return (
        <div className={`bg-white overflow-hidden ${isMini ? "w-[15rem]" : "w-[20rem]"} rounded-xl font-bold`}>
            <div className={`${isMini ? "w-[15rem] h-[18rem]" : "w-[20rem] h-[22rem]"} border-white border-[1rem] [clip-path:polygon(0%_0%,100%_0%,100%_89%,87%_100%,100%_100%,14%_100%,0%_90%,0%_5%)]`}>
                <div className={`relative bg-gradient-to-r h-full pt-2 ${fieldSelectedGradiant}`}>
                    <div class="absolute z-20 bg-[radial-gradient(circle,_#1D496C_40%,_rgba(0,0,0))] border-white border-2 -mt-4 -ml-2 w-[3rem] h-[3rem] rounded-full flex justify-center items-center text-white text-xs">
                        {levels?.[0]?.level || "?"}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 z-20 bg-white -mt-3 text-center text-[0.5rem] px-5 [clip-path:polygon(0%_0%,100%_0%,80%_100%,20%_100%)]">
                        {types?.[0]?.type || "DIGIMON"}
                    </div>
                    <div className="absolute left-2/2 -translate-x-1/2 w-20 pt-6 px-2 z-20 bg-white -mt-9 -ml-8 text-right text-md [clip-path:polygon(0%_0%,100%_0%,100%_100%,20%_100%)]">
                        <span className="text-2xl">{id.toString().padStart(4, "0")}</span>
                    </div>
                    <img src={src} alt="" className={`w-full absolute mix-blend-multiply z-30 ${isMini ? "p-6 pt-10" : "p-2 pt-6"}`} />
                    <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none ${isMini ? "p-6 pt-14" : "p-2 pt-10"}`} />
                    <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none ${isMini ? "p-5 pt-11" : "p-1 pt-7"}`} />
                    <canvas ref={canvasParticlesRef} className="absolute inset-0 z-10 pointer-events-none" />
                </div>
            </div>
            <div className="p-4 pt-0 text-white">
                <details className="group">
                    <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden [clip-path:polygon(2%_0%,98%_0%,100%_15%,100%_85%,98%_100%,2%_100%,0%_80%,0%_20%)] group-open:[clip-path:polygon(2%_0%,98%_0%,100%_15%,100%_85%,100%_100%,2%_100%,0%_100%,0%_20%)]">
                        {!isMini && (
                            <div className="bg-[#1E1510] absolute w-72 z-10 h-8 px-2 mt-2 [clip-path:polygon(0%_0%,8%_0%,15%_100%,0%_70%,70%_70%,100%_70%,100%_100%,5%_100%,0%_95%,0%_5%)]">
                                <span className="group-open:hidden">▲</span>
                                <span className="hidden group-open:inline">▼</span>
                            </div>
                        )}
                        <h2 className={`bg-gradient-to-r ${fieldSelectedGradiant} ${isMini ? "text-md" : "text-2xl"} w-full text-center pb-1 whitespace-nowrap`}>
                            {name}
                        </h2>
                    </summary>
                    {descriptions && (
                        <p className="py-2 text-xs bg-[#1E1510] h-24 overflow-y-auto font-normal px-2 [clip-path:polygon(0%_0%,100%_0%,100%_100%,100%_97%,98%_100%,3%_100%,0%_97%,0%_0%)]">
                            {descriptions.find(((item : any) => item.language === "en_us"))?.description}
                        </p>
                    )}
                </details>
                {attributes && (
                    <div className={`[clip-path:polygon(2%_0%,98%_0%,100%_15%,100%_85%,98%_100%,2%_100%,0%_80%,0%_20%)] mt-2 px-2 bg-gradient-to-r ${fieldSelectedGradiant}`}>
                        <div className="flex flex-wrap gap-x-2 text-xs py-2">
                            <h2 className="w-full">Attributes</h2>
                            {attributes.map((item) => (
                                <div>{item.attribute}</div>
                            ))}
                        </div>
                    </div>
                )}
                {fields && (
                    <div className={`[clip-path:polygon(2%_0%,98%_0%,100%_5%,100%_95%,98%_100%,2%_100%,0%_95%,0%_5%)] mt-2 px-2 bg-gradient-to-r ${fieldSelectedGradiant}`}>
                        <div className="flex flex-wrap gap-x-2 text-xs py-2 justify-center">
                            <h2 className="w-full">Fields</h2>
                            {fields.map((item) => (
                                <div class="flex items-center gap-2 py-2 w-[45%]">
                                    <img src={item.image} alt="" />
                                    {item.field}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}