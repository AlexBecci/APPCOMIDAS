interface DayProps {
    day: number;
    selected: boolean;
    onClick: () => void;
}

export function Day({ day, selected, onClick }: DayProps) {
    return (
        <button
            className={`w-10  h-10 flex items-center justify-center text-sm rounded-full transition ${selected ? "bg-creamWhite text-black" : "bg-gray-200 hover:bg-gray-300"
                }`}
            onClick={onClick}
        >
            {day}
        </button>
    );
};
