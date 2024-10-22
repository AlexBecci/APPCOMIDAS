import { AiOutlineLoading3Quarters, AiOutlineLoading, AiOutlineReload } from "react-icons/ai"

export function PulsingDot() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="rounded-full h-20 w-20 bg-coral animate-pulse"></div>
        </div>
    )
}

export function SpinningCircle() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="rounded-full h-20 w-20 border-4 border-coral border-t-transparent animate-spin"></div>
        </div>
    )
}

export function BouncingDots() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className="h-4 w-4 bg-coral rounded-full animate-bounce"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export function GrowingShrinkingCircle() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="h-20 w-20 bg-coral rounded-full animate-[grow-shrink_1.5s_ease-in-out_infinite]"></div>
        </div>
    )
}

export function FadingCircle() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative h-20 w-20">
                <div className="absolute inset-0 bg-coral rounded-full animate-[fade-in-out_1.5s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-coral rounded-full animate-[fade-in-out_1.5s_ease-in-out_infinite_0.5s]"></div>
                <div className="absolute inset-0 bg-coral rounded-full animate-[fade-in-out_1.5s_ease-in-out_infinite_1s]"></div>
            </div>
        </div>
    )
}

export function SpinningIcon() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <AiOutlineLoading3Quarters className="h-20 w-20 text-coral animate-spin" />
        </div>
    )
}

export function SpinningDots() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <AiOutlineLoading className="h-20 w-20 text-coral animate-spin" />
        </div>
    )
}

export function RotatingArrows() {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <AiOutlineReload className="h-20 w-20 text-coral animate-spin" />
        </div>
    )
}

// Add these keyframes to your global CSS file
const globalStyles = `
@keyframes grow-shrink {
  0%, 100% { transform: scale(0.5); opacity: 0.5; }
  50% { transform: scale(1); opacity: 1; }
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
`

export default function Component() {
    return (
        <div className="space-y-4">
            <style>{globalStyles}</style>
            <PulsingDot />
            <SpinningCircle />
            <BouncingDots />
            <GrowingShrinkingCircle />
            <FadingCircle />
            <SpinningIcon />
            <SpinningDots />
            <RotatingArrows />
        </div>
    )
}