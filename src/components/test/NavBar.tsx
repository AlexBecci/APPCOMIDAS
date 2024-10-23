import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../content/Variables";
import {  LiaAlignRightSolid, LiaUser } from "react-icons/lia";
export function NavBar() {
    //boolean tab
    const [booleanTab, setBooleanTab] = useState<boolean>(false);
    const [tab, setTab] = useState<boolean>(false);
    //tabUser
    const [tabUser, setTabUser] = useState<boolean>(false);

    const [maxHeight, setMaxHeight] = useState<string>('400px'); // Ajusta el valor predeterminado según lo que necesites
    const navigate = useNavigate();
    const options = [
        {
            name: 'inicio',
            route: '/home'
        },
        {
            name: 'Armar Menus',
            route: '/menus'
        },
        {
            name: 'Comidas',
            route: '/dishes'
        },
    ];

    const optionsUser = [
        {
            name: 'Perfil',
            route: '/user'
        },
        {
            name: 'Cerrar Sesion',
        },

    ]

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
            navigate('/')
            // Redirigir al usuario a la página de login o home
            /*          window.location.href = '/login'; */
        } catch (error) {
            console.error('An error occurred during logout:', error);
            return null
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");
        const handleOrientationChange = (mediaQueryList: MediaQueryListEvent | MediaQueryList) => {
            setMaxHeight(mediaQueryList.matches ? '400px' : '300px');
        };
        handleOrientationChange(mediaQuery);
        const listener = (event: MediaQueryListEvent) => {
            handleOrientationChange(event);
        };
        mediaQuery.addEventListener('change', listener);
        return () => {
            mediaQuery.removeEventListener('change', listener);
        };
    }, []);

    return (
        <div className="relative bg-deepBlue  flex flex-col z-50">
            <header className=" shadow-md p-3 text-white relative z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl ">AutoFood</h1>
                    <div className="flex justify-between items-center gap-4">
                        <button
                            onClick={() => { setTab(!tab), setTabUser(false), setBooleanTab(true) }}
                            className={`bg-slate-700 ${tab ? 'text-turquoise1' : 'text-white'}  transition-all  ease-in-out rounded-sm  p-1 mx-0`}
                        >
                            {tab ? (
                                <LiaAlignRightSolid  size={24} />
                            ) : (

                                <LiaAlignRightSolid  size={24} />
                            )}
                        </button>
                        <button
                            onClick={() => { setTabUser(!tabUser), setTab(false), setBooleanTab(true) }}
                            className={`bg-slate-700 ${tabUser ? 'text-turquoise1' : 'text-white'}  transition-all  ease-in-out rounded-sm  p-1 mx-0`}
                        >
                            <LiaUser size={24} />
                        </button>
                    </div>
                </div>
                <div
                    style={{ maxHeight: maxHeight, overflowY: 'auto', overflowX: "auto" }}
                    className={`absolute  left-0 top-full w-full transition-all duration-500 ease-in-out ${booleanTab ? 'opacity-100' : 'opacity-100'} overflow-hidden`}
                >{
                        tab === true && (
                            <div className="bg-gradient-to-bl from-deepBlue to-turquoise4 shadow-lg   p-4">
                                {options.map((option, index) => (
                                    <div key={index} className="py-2">
                                        <h1
                                            onClick={() => {
                                                setTab(false);
                                                if (option.route) {
                                                    navigate(option.route);
                                                } else {
                                                    logout()
                                                }
                                            }}
                                            className="cursor-default hover:text-turquoise1"
                                        >
                                            {option.name}
                                        </h1>

                                    </div>
                                ))}
                            </div>
                        )
                    }
                    {tabUser === true && (
                        <div className="bg-gradient-to-bl from-deepBlue to-turquoise4 shadow-lg   p-4">
                            {optionsUser.map((option, index) => (
                                <div key={index} className="py-2">
                                    <h1
                                        onClick={() => {
                                            setTabUser(false);
                                            if (option.route) {
                                                navigate(option.route);
                                            } else {
                                                logout()
                                            }
                                        }}
                                        className="cursor-default hover:text-turquoise1"
                                    >
                                        {option.name}
                                    </h1>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}