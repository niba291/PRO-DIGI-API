import type { ComponentChildren } from "preact";
import { Header } from "@components/Page/Header";
import { Footer } from "@components/Page/Footer";

interface Props {
    children?: ComponentChildren;
}

export const Layout = ({
    children
} : Props) => {
    return (
        <div 
            className="flex flex-col"
            style={{
                backgroundImage: 'url("/Digimons/bg.webp")',
            }}
        >
            <Header />
            <main className="relative flex flex-grow flex-row h-[94.9dvh] bg-black/60">
                {children}
            </main>
            <Footer />
        </div>
    );
};