import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export function NavBar() {
    const [tab, setTab] = useState<boolean>(false);
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
        {
            name: 'Vehiculos',
            route: '/vehicles'
        },
        {
            name: 'Viajes',
            route: '/trips'
        },
        {
            name: 'Pagos',
            route: '/payments'
        },
    ];

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
            <header className=" shadow-md p-2 text-white relative z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl ">FastFood</h1>
                    <div className="flex justify-between items-center gap-4">
                        <button
                            onClick={() => setTab(!tab)}
                            className="bg-slate-700 text-tur transition-all  ease-in-out rounded-sm  p-1 mx-0"
                        >
                            {tab ? (
                                <IoIosArrowUp size={24} />
                            ) : (

                                <IoIosArrowDown size={24} />
                            )}
                        </button>
                    </div>
                </div>
                <div
                    style={{ maxHeight: maxHeight, overflowY: 'auto', overflowX: "auto" }}
                    className={`absolute  left-0 top-full w-full transition-all duration-500 ease-in-out ${tab ? 'opacity-100' : 'opacity-100'} ${tab ? 'h-96' : 'h-0'} overflow-hidden`}
                >
                    <div className="bg-gradient-to-bl from-deepBlue to-turquoise4 shadow-lg   p-4">
                        {options.map((option, index) => (
                            <div key={index} className="py-2">
                                <h1
                                    onClick={() => { setTab(false), navigate(`${option.route}`) }}
                                    className="cursor-default hover:text-turquoise1  "
                                >
                                    {option.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
}