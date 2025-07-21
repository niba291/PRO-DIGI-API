import type { Props as PropsCard } from "@typings/card";
import { useMask } from "@hooks/useMask";
import "@styles/CardRotating.css";

interface Props {
    list : PropsCard[],
    onClick : (id?: string) => Promise<void>
};

export const CardRotating = ({
    list = [],
    onClick
} : Props) => {    
    return (
        <div className="wrapper mt-18 md:mt-0">
            <div
                className="inner "
                style={{
                    "--quantity": list.length,
                    // "--w": "10rem",
                    // "--h": "16.25rem",
                }}
            >
                {list.map(({
                    id,
                    // href,
                    image,
                    name,
                } : PropsCard, index) => {
                    const canvasRef = useMask({ src: image });
                    return (
                        <button
                            key={id}
                            className="card cursor-pointer bg-cover [clip-path:polygon(10%_0,90%_0,100%_10%,100%_90%,90%_100%,10%_100%,0_90%,0_10%)]"
                            style={{
                                "--index": index,
                                "--color-card": "252, 142, 239",
                                backgroundImage: `url("/Digimons/${index + 1}.webp")`
                            }}
                            onClick={() => onClick(`${id}`)}
                        >
                            <div className="relative -mt-18">
                                <img src={image} alt="" className={`w-full absolute mix-blend-multiply z-30`} />
                                <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none`} />
                                <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none`} />
                                <h2 className={`absolute -top-8 z-40 text-md text-center text-white w-[95%] mx-1 pb-1 whitespace-nowrap bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 [clip-path:polygon(2%_0%,98%_0%,100%_15%,100%_85%,98%_100%,2%_100%,0%_80%,0%_20%)]`}>
                                    {name}
                                </h2>
                            </div>
                            {/* <img src={image} alt="" className={`img absolute mix-blend-multiply`} />
                            <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none`} />
                            <canvas ref={canvasRef} className={`w-full absolute inset-0 z-20 pointer-events-none`} /> */}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
