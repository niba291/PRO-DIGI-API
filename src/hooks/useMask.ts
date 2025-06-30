import { useEffect, useRef } from "preact/hooks";

interface Props {
    src: string;
    threshold?: number;
}

export const useMask    = ({
    threshold           = 200,
    src,
} : Props) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const width = img.width;
            const height = img.height;
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            const visited = new Uint8Array(width * height);
            const stack: [number, number][] = [];

            for (let x = 0; x < width; x++) {
                stack.push([x, 0], [x, height - 1]);
            }

            for (let y = 0; y < height; y++) {
                stack.push([0, y], [width - 1, y]);
            }

            const isWhite = (r: number, g: number, b: number) => {
                return r >= threshold && g >= threshold && b >= threshold;
            }

            while (stack.length) {
                const [x, y] = stack.pop()!;
                const i = (y * width + x);
                if (visited[i]) continue;

                const index = i * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];

                if (isWhite(r, g, b)) {
                    visited[i] = 1;
                    data[index + 3] = 0;

                    if (x > 0) stack.push([x - 1, y]);
                    if (x < width - 1) stack.push([x + 1, y]);
                    if (y > 0) stack.push([x, y - 1]);
                    if (y < height - 1) stack.push([x, y + 1]);
                }
            }

            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];

                if (alpha < 30) {
                    data[i + 3] = 0;
                } else if (alpha < 100) {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                    data[i + 3] = alpha;
                } else {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                    data[i + 3] = 255;
                }
            }

            ctx.clearRect(0, 0, width, height);
            ctx.putImageData(imageData, 0, 0);
        };
    }, [src]);

    return canvasRef;
};