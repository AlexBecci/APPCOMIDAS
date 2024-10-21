import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/* import { LoginDto } from "../../api/dto/user/user.dto"; */
import { BaseUrl } from "../../content/Variables";
import { toast, ToastContainer } from "react-toastify";

export interface LoginDto {
    email: string
    password: string
}

export function Login() {
    const navigate = useNavigate()
    const {
        register, handleSubmit,
    } = useForm<LoginDto>();

    //EL QUE ESCRIBE EL CODIGO DE ESTA APP ES PUTO

    async function LoginAuth(body: LoginDto) {
        try {
            const result = await fetch(`${BaseUrl}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: body.email,
                    password: body.password,
                }),
            });
            // Manejo de la respuesta
            if (!result.ok) {
                const data = await result.json();
                console.error('Login failed:', data.message);
                toast.error(`${data.message} !`, {
                    position: "top-left",
                    /*   onClose: () => {
                          window.location.reload()
                      } */
                });
                return null; // Manejar error
            }
            const data = await result.json();
            // Guardar token
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
            }
            navigate('/home');
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    }


    async function logout() {
        try {
            const result = await fetch(`${BaseUrl}/logout`, {
                method: 'POST',
                credentials: 'include', // Incluir cookies en la solicitud
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!result.ok) {
                console.error('Login failed:', result);
                return null
            }
            // Eliminar cualquier información de sesión almacenada en el frontend
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            // Redirigir al usuario a la página de login o home
            /*          window.location.href = '/login'; */
        } catch (error) {
            console.error('An error occurred during logout:', error);
            return null
        }
    }

    async function checkSession() {
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

    return (
        <div className="min-h-screen  flex items-center justify-center bg-deepBlue">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
            />
            <div className="bg-white max-w-sm  p-8 rounded-sm shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-black">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit(LoginAuth)}>
                    <div className="my-2">
                        <label htmlFor="user" className="block text-sm font-medium text-coral mb-2">
                            Usuario
                        </label>
                        <input

                            type="user"
                            id="user"
                            className="w-full px-3 py-2 border border-subText rounded-sm focus:outline-none focus:ring-2 focus:ring-buttonBlue"
                            required
                            autoComplete="off"
                            {...register('email')}
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="block text-sm font-medium text-coral mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-subText rounded-sm focus:outline-none focus:ring-2 focus:ring-buttonBlue"
                            required
                            autoComplete="off"
                            {...register('password')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-buttonBlue hover:bg-deepBlue text-white py-2 px-4 rounded-sm hover:bg-de transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {/*      <div className="mt-4 text-center">
                    <a href="#" className="text-buttonGreen hover:underline">¿Olvidaste tu contraseña?</a>
                </div> */}
                {/* <div className="mt-4 text-center">
                    <a  className="text-buttonGreen hover:underline">¿No tienes cuenta?</a>
                </div>
                <div className="mt-4">
                    <button onClick={() => navigate('/register')}
                        className="w-full bg-buttonGreen text-white py-2 px-4 rounded-sm hover:bg-[#4D8B5E] transition duration-300"
                    >
                        Crear Cuenta
                    </button>
                </div> */}
              {/*   <div className="mt-4">
                    <button onClick={checkSession}
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-sm  transition duration-300"
                    >
                        Check
                    </button>
                </div> */}
              {/*   <div className="mt-4">
                    <button onClick={logout}
                        className="w-full bg-black text-white py-2 px-4 rounded-sm  transition duration-300"
                    >
                        logout
                    </button>
                </div> */}
            </div>
        </div>
    )
}