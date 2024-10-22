import { useEffect, useState } from "react";
import { BaseUrl } from "../../content/Variables";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { getUserId } from "../../logic/user";
import { ScrollContainer } from "../logic/ScrollContainer";
import { menuDateDTO } from "../Home/Home";
import { toast, ToastContainer } from "react-toastify";

// Interfaz para los datos de los platos (dishes)
interface dto_get_dishes {
    id: number;
    name: string;
    description: string;
    category: string;
    image_url: string;
}

interface prop {
    date: string
    body: menuDateDTO | undefined
    dataComparer: string | undefined
}


interface formSend {
    user_id: number | null
    dish_id: number
    state?: string
    daily_menu_id: number | undefined
}
export function DishesByMenu({ date, body, dataComparer }: prop) {
    //comparacion de valores de fechas para un booleano

    const isSameDay = body?.menu_date.split('T')[0] === date;

    //hook form
    const { setValue, getValues } = useForm<formSend>()
    const [selected, setSelected] = useState<number>(0)
    const [emptyMenu, setEmptyMenu] = useState<boolean>(false)
    // Estado para manejar los platos y la carga
    const [dishes, setDishes] = useState<dto_get_dishes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error/* , setError */] = useState<string | null>(null);
    // Función para obtener los platos por fecha seleccionada
    async function getDishes() {
        const userId = await getUserId()

        setSelected(0)
        try {
            setLoading(true);
            const res = await fetch(`${BaseUrl}/daily_menus?date=${date}&user_id=${userId}`, { credentials: 'include' as RequestCredentials });
            if (res.status === 204) {
                setDishes([])
                setEmptyMenu(true);
                return; // Detenemos aquí para evitar continuar
            }
            if (!res.ok) {
                throw new Error("Error al obtener los platos");
            }
            const data: dto_get_dishes[] = await res.json();
            console.log(data)
            setEmptyMenu(false);
            setDishes(data);
            return
        } catch (error) {
            console.error(error);
            /* setError(error); */
        } finally {
            setLoading(false);
        }
    }

    async function createOrder(): Promise<void> {
        const dataOrder: formSend = await getValues()
        try {
            const res = await fetch(`${BaseUrl}/orders`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataOrder),
            });

            if (!res.ok) {
                const error = await res.json()
                toast.error(`${error.message} !`, {
                    position: "top-left"
                });
                // Manejar errores HTTP
                throw new Error(`Error: ${res.status} - ${res.statusText}`);

            }

            const data = await res.json();
            console.log('Order created successfully:', data);
            toast.success(`${data.message} !`, {
                position: "top-left"
            });
        } catch (error: any) {
            console.error('Error creating order:', error);
           /*  toast.error(`${error.message} !`, {
                position: "top-left"
            }); */
        }
    }
    async function setValues() {
        const userId = await getUserId()
        setValue('user_id', userId)
        setValue('daily_menu_id', body?.id)
        setValue('state', 'Confirmado')

    }

    // Hook useEffect para llamar a getDishes cuando el componente se monte
    useEffect(() => {
        console.log(body, date, dataComparer, isSameDay)
        getDishes();
        setValues()
    }, [date]);

    // Renderización condicional
    return (
        <div className="p-4 text-black w-full">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
            {loading && <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-slate-700 text-4xl" />
            </div>}
            {/*     {error && <p className="text-red-500 text-xs">Error: {error}</p>} */}
            {!loading && !error && dishes.length === 0 ? (
                <p className=" mt-[1rem] min-h-[16rem]">No hay platos disponibles en este momento...</p>
            ) : emptyMenu === true ? (
                <h1 className="text-base min-h-[16rem]  my-[1rem]">No se encontraron platos disponibles</h1>
            ) : (
                <h1 className="text-base  my-[1rem]">Platos Disponibles</h1>
            )}
            <div className="">

                <ScrollContainer maxHeight="400px">
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                        {dishes.map((dish) => (
                            <div
                                onClick={() => { setSelected(dish.id), setValue('dish_id', dish.id), setValue('daily_menu_id', body?.id) }}
                                key={dish.id}
                                className={`bg-white border-2 ${selected === dish.id ? "border-deepBlue" : ""
                                    } shadow-md rounded-md overflow-hidden hover:shadow-lg transition-transform duration-100 flex flex-col h-full justify-between`}
                            >
                                <img
                                    src={dish.image_url}
                                    alt={dish.name}
                                    className="w-full h-[8rem] object-cover "
                                />
                                <div className="p-4 text-black   text-xs mt-2">
                                    <h2 className="text-sm font-semibold">{dish.name}</h2>
                                    <p className="text-gray-600 text-xs">{dish.description}</p>
                                    <span className="text-gray-400 text-xs">{dish.category}</span>
                                </div>
                                {selected === dish.id && selected !== 0 && selected !== null && selected !== undefined && (
                                    <button
                                        onClick={createOrder}
                                        className={`py-2 w-full bg-deepBlue text-xs text-white`}
                                    >
                                        pedir
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollContainer>

            </div>
        </div>
    );
}
