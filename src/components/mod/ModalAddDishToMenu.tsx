import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Dish, getDishes } from "../../logic/dish";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
import { getUserId } from "../../logic/user";
import { BaseUrl } from "../../content/Variables";
import { createDayMenu } from "../../logic/dailyMenu";
import { createDishInMenu } from "../../logic/dailyMenuDishes";

interface dto_modal {
    onClose: () => void
    onCloseOk: () => void
    date: string // almacena la fecha del menu
}

export function ModalAddDishe({ onClose, onCloseOk, date }: dto_modal) {
    const [dishes, setDishes] = useState<Dish[]>([]); // Cambia a un array de Dish
    //constante q almacena el id del menu
    const [menuId, setMenuId] = useState<number | null>(null)
    //constante que almacena el plato seleccionado
    const [selectedId, setSelectedId] = useState<number | null>(null)
    //booleano que maneja la validacion de si ya existe el id menu o hay que crearlo
    const [booleanValid, setBooleanValid] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()

    async function getData() {
        try {
            const data = await getDishes();
            console.log(data)
            setDishes(data)
        } catch (error) {
            console.error(error)
        }
    }
    async function checkValues() {
        if (!selectedId) {
            console.log('esta vacio')
            return
        }
        if (!menuId) {
            console.log('NO hay menu creado todavia...crearlo')
            /*  const data = await createDayMenu() */
            const data = await createDay()
            console.log(data)
            console.log('se creo')
            sendData(data.id, selectedId)
            return
        }
        console.log(selectedId, menuId)
        sendData(menuId, selectedId)
    }

    async function sendData(daily_menu_id: number, dish_id: number) {
        try {
            const data = await createDishInMenu(daily_menu_id, dish_id)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function createDay() {
        const userId: any = await getUserId();
        try {
            console.log('data a enviar', userId, date)
            const data = await createDayMenu(date, userId)
            console.log(data)
            return data
        } catch (error) {
            console.error(error)
        }
    }

    //funcion que no permitiria que pueda pedir 
    async function getDateAuth(date: string) {
        const userId = await getUserId();
        try {
            const result = await fetch(`${BaseUrl}/daily_menus/auth?menu_date=${date}&user_id=${userId}`, { credentials: 'include' as RequestCredentials });

            if (!result.ok) {
                throw new Error("Error al obtener los platos");
            }

            const data = await result.json(); // Lee el cuerpo solo si hay contenido

            // Verificar si la data está vacía
            if (!data || data.length === 0) {
                console.log('No se encontró información');
                return null; // Puedes retornar null o lo que necesites
            }

            console.log('datatest', data.id);

            setMenuId(data.id)
            return data; // Retorna la data que necesitas
        } catch (error) {
            console.log(error);
            return null; // Opcionalmente retorna null en caso de error
        }
    }

    useEffect(() => {
        console.log('netrando', 'fehca a pasar', date)
        getDateAuth(date)
        getData()
    }, [])
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black text-bage bg-opacity-50 transition-opacity duration-300`}>{/*  ${showModal ? 'opacity-100' : 'opacity-0'} */}
            {/*  <ToastContainer autoClose={2000} /> */}
            {/*  {loading && (
                    <LoadingAllScreen />
                )} */}
            <div>
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <form onSubmit={handleSubmit(checkValues)} className="bg-zinc-100 text-black rounded-md p-4 w-[40vh]  shadow-xl transform transition-all duration-300">
                        <div className="flex justify-end items-center">
                            <AiOutlineCloseCircle className="text-bageDark  rounded-full m-2" size={32} onClick={onClose} />
                        </div>
                        <div className="flex justify-center items-center">
                            <h1 className="text-bage text-base mr-auto mb-[1rem] ">Platos Disponibles</h1>
                        </div>
                        <ScrollContainer maxHeight="300px">
                            <div className="grid grid-cols-2 text-white gap-4 ">
                                {dishes.map((dish, index) => (
                                    <div
                                        onClick={() => { setSelectedId(dish.id) /* setValue('dish_id', dish.id) */ }}
                                        key={dish.id}
                                        className={`bg-white border-2  shadow-md rounded-md overflow-hidden hover:shadow-lg ${selectedId === dish.id ? "border-deepBlue" : ""} transition-transform duration-100 flex items-center h-full justify-between`}
                                    >
                                        <img
                                            src={dish.image_url}
                                            alt={dish.name}
                                            className="w-[3rem] h-[3rem] rounded-full object-cover "
                                        />
                                        <div className="p-4 text-black   text-xs mt-2">
                                            <h2 className="text-xs">{dish.name}</h2>
                                            {/*  <p className="text-gray-600 text-xs">{dish.description}</p>
                                            <span className="text-gray-400 text-xs">{dish.category}</span> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollContainer>
                        {selectedId !== null && (
                            <div className="m-[2rem]">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-sm bg-deepBlue px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  "
                                >
                                    Agregar Plato al menu
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}