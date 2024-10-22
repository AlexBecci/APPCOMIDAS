import { BaseUrl } from "../content/Variables";

export async function checkSession() {
    try {
        const result = await fetch(`${BaseUrl}/check_session`, {
            method: 'GET',
            credentials: 'include', // Incluir cookies en la solicitud
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (result.status === 401) {
            // Token no está presente o no es válido
            console.error('No token provided');
            return false;
        } else if (result.status === 403) {
            // Token es inválido
            console.error('Invalid token');
            return false;
        }

        console.log('Session valid', result);
        return true; // Sesión válida

    } catch (error) {
        console.error('Error during session check:', error);
        return false; // O lanzar un error si prefieres
    }
}