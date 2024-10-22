interface DayProps {
    day: number;
    selected: boolean;
    onClick: () => void;
}

export function Day({ day, selected, onClick }: DayProps) {
    // Create a constant that always holds the current date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // Extract the day from the today variable (e.g., "22" from "2024-10-22")
    const currentDay = parseInt(today.split("-")[2]);
    console.log('data a comparar',day,currentDay);
    return (
        <button
            className={`w-10 ${currentDay === day ? 'border-2 border-deepBlue' : ''} h-10 flex items-center justify-center text-sm rounded-full transition ${selected ? "bg-slate-700 text-turquoise1 animate-" : "bg-gray-200 hover:bg-gray-300"
                }`}
            onClick={onClick}
        >
            {day}
        </button>
    );
};
