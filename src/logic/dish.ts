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


interface createDishDTO {
    name: string;
    description: string;
    category: string;
    image_url: string;
}

export async function createDish(name: string, description: string, category: string, image_url: string) {
    // Crear el objeto content con los parámetros
    const content: createDishDTO = {
        name: name,
        description: description,
        category: category,
        image_url: image_url,
    };

    try {
        const res = await fetch(`${BaseUrl}/dishes`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (!res.ok) {
            // Manejar errores HTTP
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Dish Create successfully:', data);
        return data;

    } catch (error) {
        console.error(error);
        return null; // Retorna null o lo que necesites en caso de error
    }
}