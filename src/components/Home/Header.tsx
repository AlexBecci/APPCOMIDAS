interface HeaderProps {
    username: string;
}

export function Header({ username }: HeaderProps) {
    return (
        <div className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white p-4">
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <h1 className="text-lg font-bold">¡TU OPINIÓN NOS IMPORTA!, {username}</h1>
                    <p className="text-sm">Participá por premios completando nuestra encuesta.</p>
                </div>

                <div className="text-right">
                    <button className="bg-purple-500 px-4 py-2 rounded-full text-white">
                        TU PEDIDO PARA HOY
                    </button>
                </div>
            </div>
        </div>
    );
};