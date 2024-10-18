import { Day } from "./Day";

interface CalendarProps {
    days: number[];
    selectedDay: number | null;
    setSelectedDay: (day: number) => void;
}

export function Calendar({ days, selectedDay, setSelectedDay }: CalendarProps) {
    return (
        <div className="grid grid-cols-7 gap-2 text-black mt-[2rem]">
            {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                <div key={index} className="text-center font-bold">
                    {day}
                </div>
            ))}
            {days.map((day) => (
                <div className="">
                    <Day key={day} day={day} selected={day === selectedDay} onClick={() => setSelectedDay(day)} />
                </div>
            ))}
        </div>
    );
};
