import { BaseUrl } from "../content/Variables";

export interface Dish {
    id: number;
    name: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string; // Puede ser Date si prefieres manejarlo como objeto Date
    updated_at: string; // Igualmente, puede ser Date
}

// Si prefieres un tipo que encapsule la respuesta de la API
export interface DishesResponse {
    dishes: Dish[];
}

export async function getDishes() {
    try {
        const result = await fetch(`${BaseUrl}/dishes`, { credentials: 'include' });

        if (!result.ok) {
            throw new Error(`Error al obtener platos: ${result.status} ${result.statusText}`);
        }

        const data: Dish[] = await result.json(); // Parseamos la respuesta a JSON
        return data; // Retornamos los platos obtenidos
    } catch (error) {
        console.log(error);
        return []; // Retornamos un array vacío en caso de error
    }
}