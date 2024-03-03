import  { useEffect } from 'react'
import * as Web from 'expo-web-browser'
const useWarmupBrowser = () => {
useEffect(()=>{
Web.warmUpAsync()
return ()=>{
    Web.coolDownAsync()
}
},[])
}

export default useWarmupBrowser