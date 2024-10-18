import { useMediaQuery } from "react-responsive"
import { NavBar } from "../test/NavBar"
import { Outlet } from "react-router-dom"

export function View() {
    const isMobile = useMediaQuery({ maxHeight: 639 })
    const isTablet = useMediaQuery({ minHeight: 640, maxHeight: 1023 })
    const isDesktop = useMediaQuery({ minHeight: 1024 })

    return (
        <div className="">
            {isDesktop && (
                <NavBar />
            )}
            {isTablet && (
                <NavBar />
            )}
            {isMobile && (
                <NavBar />
            )}
            <main>
                <Outlet />
            </main>
        </div>
    )
}
