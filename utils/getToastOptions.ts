import { FONT } from "@/constants/Fonts"
import type { ToastShowParams, ToastType } from "react-native-toast-message"

export const getToastOptions = ({ message1, message2, type }: { message1: string, message2?: string, type: ToastType | undefined }) => {
    return {
        type: type,
        text1: message1,
        text2: message2,
        autoHide: true,
        swipeable: true,
        text2Style: {
            fontFamily: FONT.Bold,
        },
        text1Style: {
            fontFamily: FONT.Bold,
        },
    } as ToastShowParams
}