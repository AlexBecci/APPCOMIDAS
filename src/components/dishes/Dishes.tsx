import { LiaBrailleSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../content/Variables";
import { ModalLogic } from "../logic/Modal";
import { ScrollContainer } from "../logic/ScrollContainer";
import { Dish } from "../../logic/dish";
import { ModalDish } from "../mod/ModalAddDish";



export function Dishes() {
    //constante q almacena lo cargado en el menu de esa fecha
    const [dishes, setDishes] = useState<Dish[]>([])
    //modal
    const [modal, setModal] = useState<boolean>(false)


    //funcion que no permitiria que pueda pedir 
    async function getData() {
        try {
            const result = await fetch(`${BaseUrl}/dishes`, { credentials: 'include' as RequestCredentials })
            if (!result.ok) {
                throw new Error("Error al obtener los platos");
            }
            const data = await result.json()
            // Verificar si la data está vacía
            if (!data || data.length === 0) {
                console.log('No se encontró información');
                setDishes([])
                /* setDateComparer('-') */
                return null;  // Puedes retornar null o lo que necesites
            }
            setDishes(data)
            console.log('data a mapear ', data)
            /*  const newDate = adjustDate(data)
             setDateComparer(newDate)
             setBodyMenuDate(data) */
            return
            /* console.log('result de la data encontrada', await result.json()) */
        } catch (error) {
            console.log(error)
            setDishes([])
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div /* ref={scrollRef} */>
            {/* HOME */}
            {/* !ordersBoolean && */ (
                <div className="flex flex-col items-center  text-white justify-start h-screen mx-[1rem] my-[1rem]">
                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                        <div className="grid grid-cols-1 gap-2  text-white  items-center">
                            {/*   <button className=" bg-deepBlue rounded-sm flex justify-start items-center  p-2 w-full ">
                            <LiaBrailleSolid size={24} />
                            LOREM
                            </button> */}
                            <button onClick={() => setModal(true)} className=" bg-deepBlue rounded-sm flex justify-start items-center p-2 w-full ">
                                <LiaBrailleSolid size={24} />
                                Agregar Plato
                            </button>
                        </div>
                    </div>
                    {dishes.length > 0 ? (
                        <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                            <div className="grid grid-cols-1 gap-2  text-black  items-center">
                                <h1>Platos Actuales</h1>
                                <ScrollContainer maxHeight="600px">
                                    <div className="grid grid-cols-1  gap-4 ">
                                        {dishes.map((dish) => (
                                            <div
                                                key={dish.id}
                                                className={`bg-white border-2  shadow-md rounded-md overflow-hidden hover:shadow-lg  transition-transform duration-100 flex items-center h-full justify-start`}
                                            >
                                                <img
                                                    onError={(e: any) => {
                                                        e.target.onerror = null; // Evita bucles infinitos
                                                        e.target.src = 'path/to/fallback/image.jpg'; // Imagen por defecto
                                                    }}
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
                                <h1>Por el momento no hay comidas...</h1>
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
                    <ModalDish onClose={() => (setModal(false))} onCloseOk={() => { setModal(false), getData }} />
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