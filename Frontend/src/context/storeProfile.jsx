import { create } from "zustand";
import axios from "axios";

const getAuthHeaders  = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    return {
        headers:{
            "Content-Type":"application/json",
            Authorization :`Bearer ${storedUser.state.token}`
        }
    }
}
const storeProfile = create(set=>({
    user:null,
    clearUser:()=>set({user:null}),
    profile:async()=>{
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
                const endpoint = storedUser.state.rol ==="Estudiante"
                    ? "perfil"
                    : "estudiante/perfil"
                const url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
                
            const respuesta = await axios.get(url,getAuthHeaders())
            console.log(respuesta)
            set({user:respuesta.data})
        } catch (error) {
            console.log(error)
        }
    }
}))


export default storeProfile
