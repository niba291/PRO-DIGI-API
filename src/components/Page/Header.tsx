export const Header = () => (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg p-4 flex justify-between text-2xl font-bold">
        <img
            src="/public/Digimons/digivice.webp"
            alt="Logo Digivice"
            className="h-12 w-auto ml-34"
        />
        <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-gray-400 text-4xl font-bold mb-0 ">
                ¡Bienvenido a la DigiDex!
            </h1>
        </div>
    </header>
);
