import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export function useThemeColor() {
    // const colorSchema = useColorScheme() ?? "light";
    const [theme, setTheme] = useState<"light"|"dark">("light")

// useEffect(()=>{
//     setTheme(colorSchema)
// },[colorSchema])

    function toggleTheme() {
        setTheme(p => p === "dark" ? "light" : "dark")
        // todo store theme in storage
    }

    console.log(theme)
    return {
        toggleTheme,
        theme
    };

}
