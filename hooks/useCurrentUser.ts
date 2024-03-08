import { api } from "@/convex/_generated/api"
import { DataModel } from "@/convex/_generated/dataModel"
import { useAuth } from "@clerk/clerk-expo"
import { useQuery } from "convex/react"
import { useEffect, useState } from "react"

export const useCurrentUser = () => {
    const convexUser = useQuery(api.users.currentUser)
    const [currentUser, setCurrentUser] = useState<DataModel["users"]["document"]>({} as any)

    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;

        if(convexUser)
        setCurrentUser(convexUser)

    }, [convexUser,isSignedIn,isLoaded])
    return {
        isSignedIn,
        currentUser
    }
}