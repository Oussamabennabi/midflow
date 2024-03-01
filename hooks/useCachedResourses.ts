import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useCachedResources() {

    const [loaded, error] = useFonts({
        'Font-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'Font-BoldItalic': require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
        'Font-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
        'Font-ExtraBoldItalic': require('../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
        'Font-ExtraLightItalic': require('../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf'),
        'Font-Italic': require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
        'Font-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
        'Font-LightItalic': require('../assets/fonts/PlusJakartaSans-LightItalic.ttf'),
        'Font-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'Font-MediumItalic': require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
        'Font-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'Font-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'Font-SemiBoldItalic': require('../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return loaded;
}



