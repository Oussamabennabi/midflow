import { api } from "@/convex/_generated/api"
import { DataModel } from "@/convex/_generated/dataModel"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useState } from "react"

export const useCurrentUser = ()=> {
    const {user:clerkUser} = useUser()
    const convexUser = useQuery(api.users.currentUser)
    
const [user,setUser] = useState<DataModel["users"]["document"]>()

useEffect(()=>{
    

},[])



}