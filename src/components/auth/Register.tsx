import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../content/Variables";
import { toast, ToastContainer } from "react-toastify";

export interface LoginDto {
    email: string
    password: string
    name: string
    phone_number: string
    rol: string
}

export function Register() {
    const navigate = useNavigate()
    const {
        register, handleSubmit,
    } = useForm<LoginDto>();

    //EL QUE ESCRIBE EL CODIGO DE ESTA APP ES PUTO

    async function LoginAuth(body: LoginDto) {
        try {
            const result = await fetch(`${BaseUrl}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    phone_number: body.phone_number,
                    rol:'user'
                }),
            });
            // Manejo de la respuesta
            if (!result.ok) {
                const data = await result.json();
                console.error('register failed:', data.message);
                toast.error(`${data.message} !`, {
                    position: "top-left",
                    /*   onClose: () => {
                          window.location.reload()
                      } */
                });
                return null; // Manejar error
            }
            const data = await result.json();
            toast.success(`${data.message} !\n Se te redireccionará al inicio de sesión para corroborar tus credenciales`, {
                position: "top-left",
                onClose: () => {
                    navigate('/')
                }
            });
        } catch (error) {
            console.error('An error occurred during register:', error);
        }
    }


    return (
        <div className="min-h-screen  flex items-center justify-center bg-deepBlue">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
            />
            <div className="bg-white max-w-sm  p-8 rounded-sm shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-black">Crear Usuario</h2>
                <form onSubmit={handleSubmit(LoginAuth)}>
                    <div className="my-2">
                        <label htmlFor="user" className="block text-sm font-medium text-coral mb-2">
                            Nombre
                        </label>
                        <input

                            type="user"
                            id="user"
                            className="w-full px-3 py-2 border border-subText rounded-sm focus:outline-none focus:ring-2 focus:ring-buttonBlue"
                            required
                            autoComplete="off"
                            {...register('name')}
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="user" className="block text-sm font-medium text-coral mb-2">
                            Email
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
                    <div className="my-2">
                        <label htmlFor="user" className="block text-sm font-medium text-coral mb-2">
                            N° de telefono
                        </label>
                        <input

                            type="user"
                            id="user"
                            className="w-full px-3 py-2 border border-subText rounded-sm focus:outline-none focus:ring-2 focus:ring-buttonBlue"
                            required
                            autoComplete="off"
                            {...register('phone_number')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-buttonBlue hover:bg-deepBlue text-white py-2 px-4 rounded-sm hover:bg-de transition duration-300"
                    >
                        Crear
                    </button>

                </form>
                <h1 className="text-sm text-gray-800 text-center mt-4">Si ya tienes cuenta, <span onClick={() => navigate('/')} className="text-coral bg-slate-200 p-1 rounded-sm underline">Inicia Sesión</span> </h1>
            </div>
        </div>
    )
}