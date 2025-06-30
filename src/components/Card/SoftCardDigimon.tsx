import { fieldGradients } from "@utils/gradiants";
import { useMask } from "@hooks/useMask";

export interface Props {
    id: number;
    href: string;
    image: string;
    name: string;
}

export const SoftCardDigimon = ({
    id,
    href,
    image,
    name,
} : Props) => {
    const src = image ?? "https://digi-api.com/images/digimon/w/Hi-Commandramon.png";
    const canvasRef = useMask({ src });
    
    return(
        <div className="relative w-[8rem] h-[10rem] ">
            <div className={`relative bg-gradient-to-r h-full pt-2 from-gray-700 via-gray-500 to-gray-700`}>
                <img src={src} alt="" className="w-full absolute mix-blend-multiply z-30 p-2 pt-6" />
                <canvas ref={canvasRef} className="w-full absolute inset-0 z-20 pointer-events-none p-2 pt-10" />
                <canvas ref={canvasRef} className="w-full absolute inset-0 z-20 pointer-events-none p-1 pt-7" />
            </div>
        </div>
    )
};




