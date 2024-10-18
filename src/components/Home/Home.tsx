import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Calendar } from "./Calendar";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { TestImage } from "../test/TestImage";

export function Home() {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    // Función para cambiar al mes anterior
    const goToPreviousMonth = () => {
        setCurrentDate((prevDate) => {
            setSelectedDay(null)
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    // Función para cambiar al mes siguiente
    const goToNextMonth = () => {
        setCurrentDate((prevDate) => {
            setSelectedDay(null)
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    function getDaysInMonth(month: number, year: number) {
        // Usamos el constructor de Date para obtener el último día del mes
        return new Date(year, month + 1, 0).getDate();
    }


    // Obtener el nombre del mes actual
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    console.log(selectedDay)

    useEffect(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const days: any = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);
        setDaysInMonth(days);
    }, [currentDate]);
    return (
        <div className=" my-[1rem]">
            <div className="flex flex-col items-center text-white justify-start h-screen mx-[1rem]">
                <div className="max-sm sm:max-w-md flex items-center w-full justify-between gap-4">
                    {/* ACA DEBERIA CAMBIAR EL MES Y QUE SE ACTUALICE SOLO POR EJEMPLO SIEMPRE CUANDO CARGUE CARGUE EL MES ACTUAL Y Y LAS FLECHAS CAMVIEN DE MES DE OCTUBRE A SEPTIEMBRE Y ASI */}
                    <button onClick={goToPreviousMonth} className="bg-slate-700 rounded-md  p-2 mx-0"><FaArrowCircleLeft size={24} /></button>
                    <h1 className="text-black text-lg">{/* ACA IRIA EL MES EN CUESTION ACTUAL */}{monthName}</h1>
                    <button onClick={goToNextMonth} className="bg-slate-700 rounded-md  p-2 mx-0"><FaArrowCircleRight size={24} /></button>
                </div>
                <div className="max-w-xs sm:mx-sm lg:mx-md">
                    <Calendar days={daysInMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                </div>
                <TestImage />
            </div>
        </div>
    );
}