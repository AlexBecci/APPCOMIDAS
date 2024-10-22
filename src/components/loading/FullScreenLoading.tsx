export function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
            <div className="flex justify-center items-center h-screen">
                <div className="rounded-full h-20 w-20 bg-coral animate-ping"></div>
            </div>
        </div>
    )
}