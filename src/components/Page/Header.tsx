export const Header = () => (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg p-4 flex justify-center text-2xl font-bold">
        <img
            src={`${import.meta.env.BASE_URL}/Digimons/digivice.webp`}
            alt="Logo Digivice"
            className="h-12 md:ml-34 items-start"
        />
        <h1 className="flex-1 hidden md:block text-gray-400 text-4xl font-bold mb-0 text-center md:pr-34">
            ¡Bienvenido a la DigiDex!
        </h1>
        <h1 className="md:hidden flex-1 text-gray-400 text-4xl font-bold mb-0 text-center">
            DigiDex
        </h1>
    </header>
);
