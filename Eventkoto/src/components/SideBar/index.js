import {useState, useEffect} from "react"
import Sidebar from "./sidebar"
import SidebarAdmin from "./sidebaradmin"
import { FireAuth } from "../../libs/firebase/auth"

export function CompSidebar(){

    let [admin, setAdmin] = useState(false)

    useEffect(() => {
        FireAuth.hookAccount(async (e) => {
            if (e){
                //console.log(e)
                //console.log(e.emailVerified)
            }
            let d = await FireAuth.getUser()
            //console.log(d)
            //console.log(d.type == 1)
            setAdmin(d.type == 1)
        })
    }, [])

    return (
        <>
            {
                admin ?
                <SidebarAdmin />
                :
                <Sidebar />
            }
        </>
    )
}