import { I18n } from 'i18n-js';

import fr from "../translations/fr.json";
import ar from "../translations/ar.json";
import en from "../translations/en.json";
import * as Localization from 'expo-localization';

const i18n = new I18n({
    en ,
    fr, ar,
    'en-US':en
});

// Set the locale once at the beginning of your app.
i18n.locale =  Localization.locale;

i18n.enableFallback = true;

export const changeLanguage = (newLocale:string) => {
    i18n.locale = newLocale;
    // TODO:
    // You can also store the selected locale in AsyncStorage or elsewhere
  };
export default i18n;