import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createDish } from "../../logic/dish";
import { ScrollContainer } from "../logic/ScrollContainer";
import { useForm } from "react-hook-form";
//imagenes a elegir
import { imageUrl } from '../../content/Variables'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../loading/FullScreenLoading";
interface dto_modal {
    onClose: () => void
    onCloseOk: () => void
    date?: string // almacena la fecha del menu
}

interface createDishDTO {
    name: string
    description: string
    category: string
    image_url: string

}
export function ModalDish({ onClose, /* onCloseOk, date */ }: dto_modal) {
    const [loading, setLoading] = useState<boolean>(false)
    //images load
    const [images, setImages] = useState(imageUrl)
    //url de la imagen
    const [url, setUrl] = useState<string>('')
    //booleano q muestra las imagenes
    const [viewImages, setViewImages] = useState<boolean>(false)

    const { register, handleSubmit, setValue, getValues } = useForm<createDishDTO>()

    async function sendData() {
        setLoading(true)
        const data = await getValues()
        if (data.image_url === undefined || data.image_url === null) {
            console.log('')
            setLoading(false)
            toast.error(`imagen no seleccionada !`, {
                position: "top-left",
                /*   onClose: () => {
                      window.location.reload()
                  } */
            });
            return
        }
        try {
            const result = await createDish(data.name, data.description, data.category, data.image_url)
            if (result.boolean === false) {
                setLoading(false)
                toast.error(`${result.message} !`, {
                    position: "top-left",
                    /*   onClose: () => {
                          window.location.reload()
                      } */
                });
                return
            }
            console.log(result.message)
            setLoading(false)
            toast.success(`${result.message} !`, {
                position: "top-left",
                onClose: () => {
                    window.location.reload()
                    onClose()
                }
            });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }




    useEffect(() => {
        setImages(imageUrl)
    }, [])
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black text-bage bg-opacity-50 transition-opacity duration-300`}>{/*  ${showModal ? 'opacity-100' : 'opacity-0'} */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div>
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    {loading && (
                        <Loading />
                    )}
                    <form onSubmit={handleSubmit(sendData)} className="bg-zinc-100 text-black rounded-md p-4 w-[40vh]  shadow-xl transform transition-all duration-300">
                        <div className="flex justify-end items-center">
                            <AiOutlineCloseCircle className="text-black  rounded-full m-2" size={32} onClick={onClose} />
                        </div>
                        <div className="flex justify-center items-center">
                            <h1 className=" text-base mr-auto mb-[1rem] ">Crear Plato</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="button" onClick={() => setViewImages(!viewImages)} className=" text-sm mr-auto  rounded-sm bg-deepBlue px-3 py-1.5  leading-6 text-white shadow-sm flex items-center">Seleccionar Imagen {viewImages ? <IoIosArrowDown size={24} /> : <IoIosArrowUp size={24} />} </button>
                        </div>
                        {viewImages && (

                            <div className=" text-white  my-[1rem] ">
                                <ScrollContainer maxHeight="150px">
                                    <div className="grid grid-cols-2 gap-4">
                                        {images.map((dish, index) => (
                                            <div
                                                onClick={() => { setUrl(dish.url), setValue('image_url', dish.url) }}
                                                key={index}
                                                className={`bg-white border-2 text-black ${url === dish.url ? "border-2 border-deepBlue" : ""} shadow-md rounded-md overflow-hidden hover:shadow-lg  transition-transform duration-100 flex items-center h-full justify-between`}
                                            >
                                                <img
                                                    src={dish.url}
                                                    alt='image'
                                                    className="w-full h-full max-h-[4rem] rounded-md object-cover "
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollContainer>
                            </div>
                        )}
                        <div className="my-4">
                            <label className="block text-bage text-sm font-medium mb-1">Nombre</label>
                            <div className="relative flex items-center">
                                {/*  <span className="absolute left-3 top-[48%] transform -translate-y-1/2 text-gray-500 text-sm">$</span> */}
                                <input
                                    {...register('name')}
                                    required
                                    autoComplete="off"
                                    className="block w-full pl-4 pr-3 py-2 rounded-sm border border-gray-300 shadow-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bageDark sm:text-sm"
                                    min={1}
                                    type="text"
                                    placeholder="..."
                                />
                            </div>
                        </div>
                        <div className="my-4">
                            <label className="block text-bage text-sm font-medium mb-1">Descripción</label>
                            <div className="relative flex items-center">
                                {/*  <span className="absolute left-3 top-[48%] transform -translate-y-1/2 text-gray-500 text-sm">$</span> */}
                                <input
                                    {...register('description')}
                                    required
                                    autoComplete="off"
                                    className="block w-full pl-4 pr-3 py-2 rounded-sm border border-gray-300 shadow-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bageDark sm:text-sm"
                                    min={1}
                                    type="text"
                                    placeholder="..."
                                />
                            </div>
                        </div>
                        <div className="my-4">
                            <label className="block text-bage text-sm font-medium mb-1">Categoría</label>
                            <div className="relative flex items-center">
                                {/*  <span className="absolute left-3 top-[48%] transform -translate-y-1/2 text-gray-500 text-sm">$</span> */}
                                <input
                                    {...register('category')}
                                    required
                                    autoComplete="off"
                                    className="block w-full pl-4 pr-3 py-2 rounded-sm border border-gray-300 shadow-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bageDark sm:text-sm"
                                    min={1}
                                    type="text"
                                    placeholder=".."
                                />
                            </div>
                        </div>
                        <div className="my-4">
                            <label className="block text-bage text-sm font-medium mb-1">Imagen Seleccionada</label>
                            <div className="relative flex items-center">
                                {/*  <span className="absolute left-3 top-[48%] transform -translate-y-1/2 text-gray-500 text-sm">$</span> */}
                                <input
                                    {...register('image_url')}
                                    disabled
                                    required
                                    autoComplete="off"
                                    className="block w-full pl-4 pr-3 py-2 rounded-sm border text-gray-500 border-gray-300 shadow-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bageDark sm:text-sm"
                                    type="text"
                                    placeholder=".."
                                />
                            </div>
                        </div>
                        <div className="m-[2rem]">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-sm bg-deepBlue px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  "
                            >
                                Cargar Plato
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}