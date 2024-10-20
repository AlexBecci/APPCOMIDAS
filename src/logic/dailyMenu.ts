import { BaseUrl } from "../content/Variables";

export interface createDayMenuDTO {
    menu_date: string
    user_id: number
}

export async function createDayMenu(date: string, user_id: number) {
    //crear el objeto content con los parametros
    const content: createDayMenuDTO = {
        menu_date: date,
        user_id: user_id
    }
    try {
        const res = await fetch(`${BaseUrl}/daily_menus`, {
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
        console.log('Order created successfully:', data);
        return data

    } catch (error) {
        console.error(error)
    }
}