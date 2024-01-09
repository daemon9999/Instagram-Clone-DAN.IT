
import { Toaster } from "react-hot-toast"
import {Outlet} from "react-router-dom"

export default function AuthLayout() {
  
    return (
        <>
            <Toaster/>
            <div className=" h-full">
               <Outlet/>
            </div>
        </>
    )
}