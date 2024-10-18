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
    console.log('select', selected)
    // Hook useEffect para llamar a getDishes cuando el componente se monte
    useEffect(() => {
        getDishes();
    }, []);



    // Renderización condicional
    return (
        <div className="p-4 text-black">
            {loading && <p className="text-blue-500">Cargando...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && dishes.length === 0 ? (
                <p className=" mt-[1rem]">No hay platos disponibles en este momento.</p>
            ) : (
                <h1 className="text-lg font-bold my-[1rem]">Platos Disponibles</h1>

            )}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                {dishes.map((dish) => (
                    <div onClick={() => setSelected(dish.id)} key={dish.id} className={`bg-white border-2 ${selected === dish.id ? " border-turquoise4  " : " hover:bg-gray-300"
                        }  shadow-lg rounded-lg overflow-hidden`}>
                        <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-full border border-black h-1/3  object-cover"
                        />
                        <div className="p-4 text-xs">
                            <h2 className=" font-semibold">{dish.name}</h2>
                            <p className="text-gray-600">{dish.description}</p>
                            <span className="text-gray-500 ">{dish.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
