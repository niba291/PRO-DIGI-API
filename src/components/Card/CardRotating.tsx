import type { Props as PropsCard } from "@typings/card";
import { useMask } from "@hooks/useMask";
import "@styles/CardRotating.css";

const images = [
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\1.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\2.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\3.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\4.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\5.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\6.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\7.webp",
    "E:\\Proyectos\\PRO-DIGI-API\\public\\Digimons\\8.webp",
];

// const cards = [
//   { index: 0, color: "142, 249, 252", img: "/Digimons/1.webp" },
//   { index: 1, color: "142, 252, 204", img: "/Digimons/2.webp" },
//   { index: 2, color: "142, 252, 157", img: "/Digimons/3.webp" },
//   { index: 3, color: "215, 252, 142", img: "/Digimons/4.webp" },
//   { index: 4, color: "252, 252, 142", img: "/Digimons/5.webp" },
//   { index: 5, color: "252, 208, 142", img: "/Digimons/6.webp" },
//   { index: 6, color: "252, 142, 142", img: "/Digimons/7.webp" },
//   { index: 7, color: "252, 142, 239", img: "/Digimons/8.webp" },
// ];

interface Props {
    list : PropsCard[],
    onClick : (id?: string) => Promise<void>
};

export const CardRotating = ({
    list = [],
    onClick
} : Props) => {    
    return (
        <div className="wrapper">
            <div
                className="inner"
                style={{
                    "--quantity": list.length,
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
                                "--index": id,
                                "--color-card": "252, 142, 239",
                                backgroundImage: `url("/Digimons/${index + 1}.webp")`
                            }}
                            onClick={() => onClick(`${id}`)}
                        >
                            {/* <img
                                className="img"
                                alt={image}
                                src={image}
                            /> */}
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
