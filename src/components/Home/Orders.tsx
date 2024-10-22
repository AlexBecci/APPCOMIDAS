import { useEffect, useState } from 'react';
import { BaseUrl } from '../../content/Variables';
import { getUserId } from '../../logic/user';
import { IoMdArrowBack } from 'react-icons/io';
import { ScrollContainer } from '../logic/ScrollContainer';

interface Prop {
    boolean: boolean;
    close: () => void;
    title:string
}
interface OrderDTO {
    order_id: number;
    user_id: number;
    dish_id: number;
    state: string;
    created_at: string; // o Date
    updated_at: string; // o Date
    dish_name: string;
    dish_description: string;
    dish_category: string;
    dish_image_url: string;
}
export function Orders({ boolean, close ,title}: Prop) {
    const [isVisible, setIsVisible] = useState(boolean);
    const [opacity, setOpacity] = useState(1);
    const [orders, setOrders] = useState<OrderDTO[]>([])
    const handleClose = () => {
        // Inicia la transición de opacidad
        setOpacity(0);
        // Después de un tiempo (500ms), cierra el componente
        setTimeout(() => {
            setIsVisible(false);
            close(); // Llama a la función close para actualizar el estado en el padre
        }, 100); // Tiempo debe coincidir con la duración de la transición
    };

    // Si no está visible, no renderiza el componente
    if (!isVisible) return null;
    async function getData() {
        const userId = await getUserId()
        try {
            const res = await fetch(`${BaseUrl}/orders?user_id=${userId}`, { credentials: 'include' as RequestCredentials })
            const data = await res.json()
            setOrders(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div style={{ opacity }} // Aplica el estado de opacidad
            className="absolute transition-opacity duration-100 inset-0 bg-white min-h-screen">
            <div
                className="flex flex-col items-center justify-start mt-[6rem] mx-[1rem] min-h-full "

            >
                <button onClick={handleClose} className=" mr-auto bg-slate-700 text-creamWhite rounded-full  p-2 mx-0">
                    <IoMdArrowBack size={24} />
                </button>
                <h1 className="text-black text-2xl g my-[1rem] mr-auto">{title}</h1>
                <ScrollContainer maxHeight='650px'>
                    {orders.map((order) => (
                        <div key={order.order_id} className=" w-full my-[1rem] bg- shadow-lg rounded-sm">
                            <div className='grid grid-cols-2 gap-4 text-xs p-2  items-center justify-center'>
                                <div className='flex col-span-2 items-center justify-start'>
                                    <img
                                        src={order.dish_image_url}
                                        alt={order.dish_name}
                                        className="w-12 h-12  rounded-full object-cover"
                                    />
                                    <h2 className="text-lg ml-[1rem] font-semibold text-gray-800">{order.dish_name}</h2>
                                </div>
                                <p className="text-gray-600">{order.dish_description}</p>
                                <p className=" text-gray-500">Categoría: {order.dish_category}</p>
                                <p className=" text-gray-500 flex items-center"><p className='w-3 h-3 bg-turquoise1 rounded-full'></p> {order.state}</p>
                                <p className=" text-gray-500">Creado el: {new Date(order.created_at).toLocaleString()}</p>
                                <p className=" text-gray-500">Actualizado el: {new Date(order.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </ScrollContainer>
                {/* Aquí puedes agregar más contenido */}
            </div>
        </div>
    );
}
