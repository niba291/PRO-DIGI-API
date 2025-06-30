import { useRef, useEffect } from "preact/hooks";
import { getRandom } from "@utils/getRandom";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    size: number;
}

interface Props {
    text?: string[];
    color?: string;
    qty?: number;
    velocity?: [number, number];
    size?: [number, number];
}

export const useParticles = ({
    text = [],
    color = "#FFFFFF80",
    qty = 100,
    velocity = [4, 5],
    size = [12, 20],
}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        particlesRef.current = [];
        for (let i = 0; i < qty; i++) {
            particlesRef.current.push({
                x: getRandom(0, canvas.width),
                y: getRandom(0, canvas.height),
                vx: getRandom(velocity[0], velocity[1]),
                vy: getRandom(velocity[0], velocity[1]),
                char: text[Math.floor(Math.random() * text.length)] || "*",
                size: getRandom(size[0], size[1]),
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particlesRef.current) {
                p.y += p.vy;

                if (p.y > canvas.height + p.size) {
                    p.y = -p.size;
                    p.x = getRandom(0, canvas.width);
                    p.char =
                        text[Math.floor(Math.random() * text.length)] || "*";
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(Math.PI / 2);
                ctx.font = `${p.size}px monospace`;
                ctx.fillStyle = color;
                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return canvasRef;
};