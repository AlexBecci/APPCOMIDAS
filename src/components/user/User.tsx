import { LiaBrailleSolid, LiaCalendarAlt, LiaMailBulkSolid, LiaPhoneVolumeSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../content/Variables";
import { ModalLogic } from "../logic/Modal";
import { ModalDish } from "../mod/ModalAddDish";
import { Orders } from "../Home/Orders";
import { getUserId } from "../../logic/user";


// User DTO (Data Transfer Object)
export interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    created_at: string;  // ISO date string
    updated_at: string;  // ISO date string
    rol: string;
}
export interface OrderCountDTO {
    total_orders: number
}

export function User() {
    const [ordersBoolean, setOrdersBoolean] = useState<boolean>(false)
    // Constante que almacena los datos del usuario
    const [user, setUser] = useState<User | null>(null);  // Set initial state as null to avoid undefined errors
    const [firstCharAt, setFirstCharAt] = useState<string | null>(null)
    const [dataCount, setDataCount] = useState<number | null>(null)
    // Modal
    const [modal, setModal] = useState<boolean>(false);

    function getFirstLetter(str: string): string {
        if (str.length === 0) {
            return ""; // Si el string está vacío, devolver una cadena vacía
        }
        return str.charAt(0); // Devolver el primer carácter del string
    }

    // Función para formatear las fechas
    function formatUserData(user: User): User {
        // Formatear la fecha de creación y actualización
        const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            // Obtener las partes de la fecha
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            // Devolver el formato deseado
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        return {
            ...user,
            created_at: formatDate(user.created_at),
            updated_at: formatDate(user.updated_at),
        };
    }

    //funcion q me trae el total de ordenes realizadas
    async function getDataOrder() {
        const userId = await getUserId()
        try {
            const result = await fetch(`${BaseUrl}/orders_count?user_id=${userId}`, { credentials: 'include' as RequestCredentials });

            if (!result.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            const data: OrderCountDTO = await result.json();
            // Verificar si la data está vacía
            if (data.total_orders === 0) {
                console.log('No se encontró información del usuario');
                return null;  // Retornar null o manejarlo como prefieras
            }
            console.log(data)
            setDataCount(data.total_orders)
            return /*  data; */  // Retornar la data si es necesario

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Función para obtener los datos del usuario
    async function getData() {
        const userId = await getUserId()
        try {
            const result = await fetch(`${BaseUrl}/user?user_id=${userId}`, { credentials: 'include' as RequestCredentials });

            if (!result.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            const data: User[] = await result.json();
            // Verificar si la data está vacía
            if (!data || data.length === 0) {
                console.log('No se encontró información del usuario');
                return null;  // Retornar null o manejarlo como prefieras
            }
            console.log(data)
            const formattedUser = formatUserData(data[0]);
            console.log(formattedUser);
            const firstChar = getFirstLetter(formattedUser.name)
            setFirstCharAt(firstChar)
            setUser(formattedUser);  // Asignar los datos del usuario
            /* console.log('Datos del usuario: ', data[0]); */
            return /*  data; */  // Retornar la data si es necesario

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    useEffect(() => {
        getData()
        getDataOrder()
    }, [])

    return (
        <div /* ref={scrollRef} */>
            {/* HOME */}
            {/* !ordersBoolean && */ (
                <div className="flex flex-col items-center  text-white justify-start h-screen my-[1rem]">
                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                        <div className="grid grid-cols-1 gap-2  text-white  items-center">
                            {/*   <button className=" bg-deepBlue rounded-sm flex justify-start items-center  p-2 w-full ">
                            <LiaBrailleSolid size={24} />
                            LOREM
                            </button> */}
                            <button
                                onClick={() => setModal(true)}
                                className="bg-deepBlue rounded-full flex justify-center text-5xl uppercase items-center p-2 w-[8rem] h-[8rem] mx-auto"
                            >
                                {/* <LiaBrailleSolid size={24} /> */}
                                {firstCharAt}
                            </button>
                            <h1 className="text-black text-2xl uppercase text-center">{user?.name}</h1>
                        </div>
                    </div>
                    <hr />
                    <p className="h-[0.2%] bg-gray-300 w-full my-[1rem]"></p>
                    {user && (
                        <div className="max-w-sm sm:max-w-md w-full lg:mx-md mt-[2rem]">
                            <div className="grid grid-cols-1 gap-2  text-black  items-center">
                                {/*   <h1>Información</h1> */}
                                <div className="grid grid-cols-2 text-start gap-4 ">
                                    <div className="text-gray-500">
                                        <div className="flex gap-2 items-center">
                                            <LiaMailBulkSolid size={24} />
                                            <h1 className="text-sm">Email</h1>
                                        </div>
                                        <h2 className="text-sm text-black ">{user.email}</h2>
                                    </div>
                                    <div className="text-gray-500">
                                        <div className="flex gap-2 items-center">
                                            <LiaPhoneVolumeSolid size={24} />
                                            <h1 className="text-sm">Teléfono</h1>
                                        </div>
                                        <h2 className="text-sm text-black ">{user.phone_number}</h2>
                                    </div>
                                    <div className="text-gray-500">
                                        <div className="flex gap-2 items-center">
                                            <LiaCalendarAlt size={24} />
                                            <h1 className="text-sm">Fecha de registro</h1>
                                        </div>
                                        <h2 className="text-sm text-black ">{user.created_at}</h2>
                                    </div>
                                    <div className="text-gray-500">
                                        <div className="flex gap-2 items-center">
                                            <LiaMailBulkSolid size={24} />
                                            <h1 className="text-sm">Rol</h1>
                                        </div>
                                        <h2 className="text-sm text-black ">{user.rol}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* otro componente */}
                    <p className="h-[0.2%] bg-gray-300 w-full my-[1rem]"></p>
                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md ">
                        <h1 className="text-black text-lg pb-2 ">Estadísticas</h1>
                        <div className="grid grid-cols-3 text-start text-blue-600 text-xl gap-4 ">
                            <div className="bg-blue-300 w-full  rounde-sm p-2 text-center">
                                <h1 className="">{dataCount}</h1>
                                <h1 className="text-gray-600 text-sm">Pedidos</h1>

                            </div>
                            <div className="bg-red-300 w-full  rounde-sm p-2 text-center">
                                <h1 className="">...</h1>
                                <h1 className="text-gray-600 text-sm">.......</h1>
                            </div>
                            <div className="bg-green-300 w-full  rounde-sm p-2 text-center">
                                <h1 className="">...</h1>
                                <h1 className="text-gray-600 text-sm">.......</h1>
                            </div>
                        </div>
                    </div>
                    <p className="h-[0.2%] bg-gray-300 w-full my-[1rem]"></p>

                    <div className="max-w-sm sm:max-w-md w-full lg:mx-md ">
                        <div className="grid grid-cols-1 gap-2 my-[2rem]  text-white  items-center">
                            {/*   <button className=" bg-deepBlue rounded-sm flex justify-start items-center  p-2 w-full ">
                        <LiaBrailleSolid size={24} />
                        LOREM
                        </button> */}
                            <button onClick={() => setOrdersBoolean(true)} className=" bg-deepBlue rounded-sm flex justify-start items-center p-2 w-full ">
                                <LiaBrailleSolid size={24} />
                                Ultimos Movimientos
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

            {/* ORDER OTRO TEMPLATE */}
            {
                ordersBoolean && (
                    <Orders title="Ultimos Movimientos" boolean={ordersBoolean} close={() => setOrdersBoolean(false)} />
                )
            }
            {/* ORDER OTRO TEMPLATE */}
            {/* {ordersBoolean && (
                <Orders boolean={ordersBoolean} close={() => setOrdersBoolean(false)} />
            )} */}
            {
                modal && (
                    <ModalLogic isOpen={true} onClose={() => (setModal(false))}>
                        <ModalDish onClose={() => (setModal(false))} onCloseOk={() => { setModal(false), getData }} />
                    </ModalLogic>
                )
            }
        </div >
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