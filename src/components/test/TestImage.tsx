import { useEffect, useState } from "react";
import { BaseUrl } from "../../content/Variables";

// Interfaz para los datos de los platos (dishes)
interface dto_get_dishes {
    id: number;
    name: string;
    description: string;
    category: string;
    image_url: string;
}

export function TestImage() {
    const [selected, setSelected] = useState<number>(0)
    // Estado para manejar los platos y la carga
    const [dishes, setDishes] = useState<dto_get_dishes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener los platos
    async function getDishes() {
        try {
            setLoading(true);
            const res = await fetch(`${BaseUrl}/dishes`, { credentials: 'include' as RequestCredentials });
            if (!res.ok) {
                throw new Error("Error al obtener los platos");
            }
            const data: dto_get_dishes[] = await res.json();
            console.log(data)
            setDishes(data);
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    // Hook useEffect para llamar a getDishes cuando el componente se monte
    useEffect(() => {
        getDishes();
        console.log(selected)
    }, [selected]);



    // Renderización condicional
    return (
        <div className="p-4 text-black">
            {loading && <p className="text-blue-500">Cargando...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && dishes.length === 0 ? (
                <p className=" mt-[1rem]">No hay platos disponibles en este momento...</p>
            ) : (
                <h1 className="text-base font-bold my-[1rem]">Platos Disponibles</h1>
            )}
            {/*    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {dishes.map((dish) => (
                    <div onClick={() => setSelected(dish.id)} key={dish.id} className={`bg-white  border-2 ${selected === dish.id ? " border-turquoise1  " : " hover:bg-gray-300"
                        }  shadow-lg rounded-lg overflow-hidden`}>
                        <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-full border  h-1/2  object-cover"
                        />
                        <div className="p-4 text-black text-xs">
                            <h2 className=" ">{dish.name}</h2>
                            <p className="text-gray-700">{dish.description}</p>
                            <span className="text-gray-500 ">{dish.category}</span>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {dishes.map((dish) => (
                    <div
                        onClick={() => setSelected(dish.id)}
                        key={dish.id}
                        className={`bg-white border-2 ${selected === dish.id ? "border-turquoise1" : "hover:bg-gray-300"
                            } shadow-md rounded-md overflow-hidden hover:shadow-lg transition-transform duration-100 flex flex-col h-full justify-between`}
                    >
                        <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-full h-1/2 object-cover "
                        />
                        <div className="p-4 text-black   text-xs mt-2">
                            <h2 className="text-sm font-semibold">{dish.name}</h2>
                            <p className="text-gray-600 text-xs">{dish.description}</p>
                            <span className="text-gray-400 text-xs">{dish.category}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
