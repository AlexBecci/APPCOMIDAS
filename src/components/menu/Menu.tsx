import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { LiaBrailleSolid } from "react-icons/lia";
import { Calendar } from "../Home/Calendar";
import { useEffect, useState } from "react";
import { getTodayDateNumberDay } from "../Home/Home";
import { BaseUrl } from "../../content/Variables";
import { getUserId } from "../../logic/user";
import { ModalLogic } from "../logic/Modal";
import { ModalAddDishe } from "../mod/ModalAddDishToMenu";
import { ScrollContainer } from "../logic/ScrollContainer";


interface DishDTO {
    id: number;
    name: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string; // Puede ser un Date, pero aquí lo dejamos como string para mantener el formato ISO
    updated_at: string; // Lo mismo que arriba
}
export function Menu() {
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [selectedDay, setSelectedDay] = useState<number | null>(getTodayDateNumberDay());
    //constante q almacena lo cargado en el menu de esa fecha
    const [dateDishesMenu, setDataDishesMenu] = useState<DishDTO[]>([])
    const [currentDate, setCurrentDate] = useState(new Date());
    //fecha a mandar en el fetch
    const [dateFinal, setDateFinal] = useState<string>('')
    //modal
    const [modal, setModal] = useState<boolean>(false)
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

    // Obtener el nombre del mes actual
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    function getDaysInMonth(month: number, year: number) {
        // Usamos el constructor de Date para obtener el último día del mes
        return new Date(year, month + 1, 0).getDate();
    }

    // Función para formatear la fecha como YYYY-MM-DD
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
        const day = String(date.getDate()).padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        console.log('fecha', formatDate(currentDate))
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const days: any = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);
        setDaysInMonth(days);

    }, [currentDate]);



    function changedDate(selectedDay: number | null, currentDate: Date) {
        if (selectedDay == null) {
            console.log('no se selecciono un dia')
            return
        }
        // Creamos una nueva instancia de Date manteniendo el mes y el año actuales
        const dateFinal = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);

        // Formatear la nueva fecha (dateFinal) en formato YYYY-MM-DD
        const formattedDateFinal = formatDate(dateFinal);
        /*      console.log('Día a pasar:', selectedDay); // Ejemplo: 25, día seleccionado
             console.log('Fecha original:', formatDate(currentDate)); // Ejemplo: 2024-11-20 */
        console.log('Fecha final con día seleccionado:', formattedDateFinal); // Ejemplo: 2024-11-25
        // Puedes devolver o guardar 'dateFinal' según lo que necesites
        setDateFinal(formattedDateFinal)

    }

    //funcion que no permitiria que pueda pedir 
    async function getDateAuth() {
        const userId = await getUserId()
        try {
            const result = await fetch(`${BaseUrl}/daily_menus/?date=${dateFinal}&user_id=${userId}`, { credentials: 'include' as RequestCredentials })
            if (!result.ok) {
                throw new Error("Error al obtener los platos");
            }
            const data = await result.json()
            // Verificar si la data está vacía
            if (!data || data.length === 0) {
                console.log('No se encontró información');
                setDataDishesMenu([])
                /* setDateComparer('-') */
                return null;  // Puedes retornar null o lo que necesites
            }
            setDataDishesMenu(data)
            console.log('data a mapear ', data)
            /*  const newDate = adjustDate(data)
             setDateComparer(newDate)
             setBodyMenuDate(data) */
            return
            /* console.log('result de la data encontrada', await result.json()) */
        } catch (error) {
            console.log(error)
            setDataDishesMenu([])
        }
    }
    /*   useEffect(() => {
          getDateAuth(dateFinal)
      }, [dateFinal]) */
    useEffect(() => {
        changedDate(selectedDay, currentDate)

    }, [selectedDay])

    useEffect(() => {
        getDateAuth()
    }, [dateFinal])
    console.log('data', dateFinal)

    return (
        <div /* ref={scrollRef} */>
            {/* HOME */}
            {/* !ordersBoolean && */ (
                <div className="flex flex-col items-center  text-white justify-start h-screen mx-[1rem] my-[1rem]">
                    <div className="max-sm sm:max-w-md flex items-center w-full justify-between gap-4">
                        {/* ACA DEBERIA CAMBIAR EL MES Y QUE SE ACTUALICE SOLO POR EJEMPLO SIEMPRE CUANDO CARGUE CARGUE EL MES ACTUAL Y Y LAS FLECHAS CAMVIEN DE MES DE OCTUBRE A SEPTIEMBRE Y ASI */}
                        <button onClick={goToPreviousMonth} className="bg-slate-700 text-white rounded-full  p-2 mx-0"><IoMdArrowBack size={24} /></button>
                        <h1 className="text-black text-lg">{/* ACA IRIA EL MES EN CUESTION ACTUAL */}{monthName}</h1>
                        <button onClick={goToNextMonth} className="bg-slate-700 text-white rounded-full  p-2 mx-0"><IoMdArrowForward size={24} /></button>
                    </div>
                    <div className="max-w-xs sm:max-w-sm lg:mx-md">
                        <Calendar days={daysInMonth} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                        {selectedDay}
                    </div>
                    {/*  {selectedDay !== null && selectedDay !== undefined ? (
                        <DishesByMenu body={bodyMenuDate} dataComparer={dateComparer} date={selectedDate} />
                    ) : (
                        <h1 className="text-sm text-black anima mt-[3rem]">Seleciona un día para elegir menu</h1>
                    )} */}
                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                        <div className="grid grid-cols-1 gap-2  text-white  items-center">
                            {/*   <button className=" bg-deepBlue rounded-sm flex justify-start items-center  p-2 w-full ">
                            <LiaBrailleSolid size={24} />
                            LOREM
                            </button> */}
                            <button onClick={() => setModal(true)} className=" bg-deepBlue rounded-sm flex justify-start items-center p-2 w-full ">
                                <LiaBrailleSolid size={24} />
                                Agregar Platos al Menú
                            </button>
                        </div>
                    </div>
                    {dateDishesMenu.length > 0 ? (
                        <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                            <div className="grid grid-cols-1 gap-2  text-black  items-center">
                                <h1>Menu Actual</h1>
                                <ScrollContainer maxHeight="400px">
                                    <div className="grid grid-cols-1  gap-4 ">
                                        {dateDishesMenu.map((dish) => (
                                            <div
                                                key={dish.id}
                                                className={`bg-white border-2  shadow-md rounded-md overflow-hidden hover:shadow-lg  transition-transform duration-100 flex items-center h-full justify-start`}
                                            >
                                                <img
                                                    src={dish.image_url}
                                                    alt={dish.name}
                                                    className="w-[4rem] h-[4rem] rounded-full object-cover "
                                                />
                                                <div className="p-4 text-black   text-xs mt-2">
                                                    <h2 className="text-sm uppercase">{dish.name}</h2>
                                                    <p className="text-gray-600 text-xs">{dish.description}</p>
                                                    <span className="text-gray-400 text-xs lowercase">{dish.category}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollContainer>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                            <div className="grid grid-cols-1 gap-2  text-black  items-center">
                                <h1>No hay platos asociados a este menu</h1>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* ORDER OTRO TEMPLATE */}
            {/* {ordersBoolean && (
                <Orders boolean={ordersBoolean} close={() => setOrdersBoolean(false)} />
            )} */}
            {modal && (
                <ModalLogic isOpen={true} onClose={() => (setModal(false))}>
                    <ModalAddDishe date={dateFinal} onClose={() => (setModal(false))} onCloseOk={() => (setModal(false))} />
                </ModalLogic>
            )}
        </div>
    )
}
/* 
  //funcion que no permitiria que pueda pedir 
    async function getDateAuth(date: string) {
        const userId = await getUserId()
        try {
            const result = await fetch(`${BaseUrl}/daily_menus/auth?menu_date=${date}&user_id=${userId}`, { credentials: 'include' as RequestCredentials })
            if (!result.ok) {
                throw new Error("Error al obtener los platos");
            }
            // Verifica si la respuesta tiene un contenido
            const text = await result.text(); // Extraer el texto primero
            if (!text) {
                console.log('No se encontró información (respuesta vacía)');
                return null;
            }
            const data = await result.json()
            // Verificar si la data está vacía
            if (!data || data.length === 0) {
                console.log('No se encontró información');

                return null;  // Puedes retornar null o lo que necesites
            }
            console.log('datatest', data)

            return
            console.log('result de la data encontrada', await result.json())
        } catch (error) {
            console.log(error)
        }
    }
*/