import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/* import { LoginDto } from "../../api/dto/user/user.dto"; */
import { BaseUrl } from "../../content/Variables";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Loading } from "../loading/FullScreenLoading";
import { BouncingDots, FadingCircle, GrowingShrinkingCircle, PulsingDot, RotatingArrows, SpinningCircle, SpinningDots, SpinningIcon } from "../loading/Loadings";

export interface LoginDto {
    email: string
    password: string
}

export function Login() {
    const navigate = useNavigate()
    const {
        register, handleSubmit,
    } = useForm<LoginDto>();
    //loading const
    const [loading, setLoading] = useState<boolean>(false)
    //EL QUE ESCRIBE EL CODIGO DE ESTA APP ES PUTO

    async function LoginAuth(body: LoginDto) {
        setLoading(true)
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
                setLoading(false)
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
            setLoading(false)
            navigate('/home');
        } catch (error) {
            console.error('An error occurred during login:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center bg-deepBlue">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
            />
            {loading && (
                <Loading/>
            )}
            {/* <BouncingDots /> */}
            <div className="bg-white max-w-sm text-gray-800  p-8 rounded-sm shadow-md w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-black">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit(LoginAuth)}>
                    <p className="text-sm text-gray-800 text-center mb-4">
                        mas formas de iniciar sesion <br />
                        estaran disponibles en un futuro
                    </p>
                    <div className="my-2">
                        <label htmlFor="user" className="block text-sm font-medium text-coral mb-2">
                            Email
                        </label>
                        <input

                            type="email"
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
                <h1 className="text-sm text-gray-800 text-center mt-4">Si no tienes cuenta, <span onClick={() => navigate('/register')} className="text-coral bg-slate-200 p-1 rounded-sm underline">CREALA</span> </h1>
            </div>
        </div>
    )
}