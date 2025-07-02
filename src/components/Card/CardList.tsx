// export interface Props {
//     id: number;
//     href: string;
//     image: string;
//     name: string;
// }

const cards = [
  {
    label: "Github",
    icon: (
      <svg viewBox="0 0 496 512" className="w-10 h-10 fill-white">
        <path d="M165.9 397.4c0 2..."></path>
      </svg>
    ),
    rotation: "-rotate-15",
  },
  {
    label: "Code",
    icon: (
      <svg viewBox="0 0 640 512" className="w-10 h-10 fill-white">
        <path d="M392.8 1.2c-17-4.9..."></path>
      </svg>
    ),
    rotation: "rotate-5",
  },
  {
    label: "Earn",
    icon: (
      <svg viewBox="0 0 576 512" className="w-10 h-10 fill-white">
        <path d="M64 64C28.7 64..."></path>
      </svg>
    ),
    rotation: "rotate-15",
  },
];

export const CardList = () => {

    return (
        <div className="relative flex justify-center items-center group container-card rotate-1">
            {cards.map((card, index) => (
                <div
                    key={index}
                    data-text={card.label}
                    className={`relative w-[180px] h-[200px] bg-gradient-to-b from-white/20 to-transparent border border-white/10 shadow-[0_25px_25px_rgba(0,0,0,0.25)] flex justify-center items-center transition-all duration-500 rounded-[10px] mx-[-45px] backdrop-blur-[10px] group-hover:rotate-0 group-hover:mx-[10px] ${card.rotation}`}
                >
                    {card.icon}
                    <div className="absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-white text-sm">
                        {card.label}
                    </div>
                </div>
            ))}
        </div>
    );
};
