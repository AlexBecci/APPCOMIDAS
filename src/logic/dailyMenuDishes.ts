import { BaseUrl } from "../content/Variables";

// Definir el DTO para la creación del plato en el menú
interface CreateDishInMenuDTO {
    daily_menu_id: number;
    dish_id: number;
}

export async function createDishInMenu(daily_menu_id: number, dish_id: number) {
    // Crear el objeto content con los parámetros
    const content: CreateDishInMenuDTO = {
        daily_menu_id: daily_menu_id,
        dish_id: dish_id
    };

    try {
        const res = await fetch(`${BaseUrl}/daily_menus/dishes`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (!res.ok) {
            // Manejar errores HTTP
            const data = await res.json()
            return { message: data.message, boolean: false }
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Dish added to menu successfully:', data);
        return data;

    } catch (error) {
        console.error(error);
        return null; // Retorna null o lo que necesites en caso de error
    }

}