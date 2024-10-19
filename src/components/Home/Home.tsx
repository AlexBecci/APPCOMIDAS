import { useEffect, useRef, useState } from "react";
import { Calendar } from "./Calendar";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { DishesByMenu } from "../test/DishesByMenu";
import { LiaBrailleSolid } from "react-icons/lia";
import { Orders } from "./Orders";

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11, así que sumamos 1
    const day = String(today.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    return `${year}-${month}-${day}`;
}

function getTodayDateNumberDay() {
    const today = new Date();
    const day = parseInt(String(today.getDate()).padStart(2, '0')); // Convierte el día a string y asegura que tenga dos dígitos
    return day;
}

export function Home() {
    // Ejemplo de uso
    const [selectedDay, setSelectedDay] = useState<number | null>(getTodayDateNumberDay());
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDate())
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    //openTemplateOrders
    const [ordersBoolean, setOrdersBoolean] = useState<boolean>(false)
    //use ref para una mejor ui
    // Crear una referencia
    const scrollRef = useRef<HTMLDivElement>(null);
    // Función que hará scroll al div
    const scrollToDiv = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth', // Para un desplazamiento suave
                block: 'start',     // Opciones: 'start', 'center', 'end'
            });
        }
    };

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
        console.log('FECHAAA', new Date(year, month + 1, 0).getDate())
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

    useEffect(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        console.log(`${year}-${month + 1}-${selectedDay}`)
        setSelectedDate(`${year}-${month + 1}-${selectedDay}`)
    }, [selectedDay])

    useEffect(() => {
        if (ordersBoolean) {
            scrollToDiv()
        }
    }, [ordersBoolean])
    return (
        <div ref={scrollRef}>
            {/* HOME */}
            {!ordersBoolean && (
                <div className="flex flex-col items-center text-white justify-start h-screen mx-[1rem] my-[1rem]">
                    <div className="max-sm sm:max-w-md flex items-center w-full justify-between gap-4">
                        {/* ACA DEBERIA CAMBIAR EL MES Y QUE SE ACTUALICE SOLO POR EJEMPLO SIEMPRE CUANDO CARGUE CARGUE EL MES ACTUAL Y Y LAS FLECHAS CAMVIEN DE MES DE OCTUBRE A SEPTIEMBRE Y ASI */}
                        <button onClick={goToPreviousMonth} className="bg-slate-700 rounded-sm  p-2 mx-0"><FaArrowCircleLeft size={24} /></button>
                        <h1 className="text-black text-lg">{/* ACA IRIA EL MES EN CUESTION ACTUAL */}{monthName}</h1>
                        <button onClick={goToNextMonth} className="bg-slate-700 rounded-sm  p-2 mx-0"><FaArrowCircleRight size={24} /></button>
                    </div>
                    <div className="max-w-xs sm:max-w-sm lg:mx-md">
                        <Calendar days={daysInMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                        {selectedDay}
                    </div>
                    {selectedDay !== null && selectedDay !== undefined ? (
                        <DishesByMenu date={selectedDate} />
                    ) : (
                        <h1 className="text-sm text-black anima mt-[3rem]">Seleciona un día para elegir menu</h1>
                    )}
                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                        <div className="grid grid-cols-2 gap-2  text-white  items-center">
                            {/*   <button className=" bg-deepBlue rounded-sm flex justify-start items-center  p-2 w-full ">
                        <LiaBrailleSolid size={24} />
                        LOREM
                        </button> */}
                            <button onClick={() => setOrdersBoolean(true)} className=" bg-deepBlue rounded-sm flex justify-start items-center p-2 w-full ">
                                <LiaBrailleSolid size={24} />
                                Ordenes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ORDER OTRO TEMPLATE */}
            {ordersBoolean && (
                <Orders boolean={ordersBoolean} close={() => setOrdersBoolean(false)} />
            )}
        </div>
    );
}