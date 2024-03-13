


export const COLOR_SHADES = {
  white: {
    primary: "#fff"
  },
  blue: {
    /**
     * #ffe7eb

     *  */
    primary: '#0F66FF',
    secondary: '#D1E5FF',
    lowOpacity: '#0f67ff2c',
    shade1: '#ECF5FE',
    shade2: '#A6CBFF',
    shade3: '#78AFFE',
    shade4: '#458CFF',
    shade5: '#0049CF',
    shade6: '#00349C',
    shade7: '#00226C',
    shade8: '#001240',
  },
  teal: {
    shade1: '#D8FBFA',
    shade2: '#9EEFF0',
    shade3: '#3DD6DB',
    shade4: '#08B5BC',
    shade5: '#00929D',
    shade6: '#00737D',
    shade7: '#00545D',
    shade8: '#013C45',
    shade9: '#032B30',
    shade10: '#080E1C',
  },
  green: {
    shade1: '#f0fdf4',
    opacity:"#4ade804d",
    shade2: '#dcfce7',
    shade3: '#bbf7d0',
    shade4: '#86efac',
    primary: '#4ade80',
    shade6: '#22c55e',
    shade7: '#16a34a',
    shade8: '#15803d',
    shade9: '#166534',
    shade10: '#14532d',
  },
  cyan: {
    shade1: '#E4F6FE',
    shade2: '#BAE6FF',
    shade3: '#83CEFF',
    shade4: '#32B1FE',
    shade5: '#1193E9',
    shade6: '#0072C3',
    shade7: '#01529A',
    shade8: '#003B6C',
    shade9: '#012749',
    shade10: '#071627',
  },
  red: {
    shade1: '#ffe7eb',

    shade2: '#FED6DD',
    shade3: '#FEB2BD',
    shade4: '#FE8291',
    opacity: '#fb4c5e49',
    shade5: '#FB4C5E',
    shade6: '#DA1F2F',
    shade7: '#A31923',
    shade8: '#750E13',
    shade9: '#520407',
    shade10: '#2D0708',
  },
  purply: {
    shade1: '#F7F3FF',
    shade2: '#E7DAFE',
    shade3: '#D3BBFF',
    shade4: '#BC95FF',
    shade5: '#A46EFE',
    opacity: '#a56efe3a',
    shade6: '#8A3EFD',
    shade7: '#6828C4',
    shade8: '#491D8B',
    shade9: '#30135F',
    shade10: '#1D0E30',
  },
  gray: {
    primary: '#252F49',
    secondary: '#5D6B84',
    shade1: '#F3F4F9',
    shade15: '#eeeeee',
    shade2: '#DDE0E8',
    shade3: '#BEC5D2',
    shade4: '#9FA7B9',
    shade5: '#808AA0',
    shade6: '#3C4967',
    shade7: '#141A30',
    shade8: '#080E1C',
  },
} as const;



export const COLORS = {
  light: {
    primary_text: COLOR_SHADES.blue.shade8,
    secondary_text: COLOR_SHADES.gray.shade5,
    primary_bg: COLOR_SHADES.gray.shade1,
    border_color: COLOR_SHADES.gray.shade3,
    secondary_bg: COLOR_SHADES.white.primary,
    tintBg: COLOR_SHADES.blue.shade5,
    icon_color_pr: COLOR_SHADES.gray.primary,
    icon_color_sc:  COLOR_SHADES.gray.shade5,
    active_icon_color:  COLOR_SHADES.blue.primary,
  },
  dark: {
    primary_text: COLOR_SHADES.white.primary,
    secondary_text: COLOR_SHADES.gray.secondary,
    border_color: COLOR_SHADES.gray.shade6,
    icon_color_pr: COLOR_SHADES.white.primary,
    icon_color_sc:  COLOR_SHADES.gray.shade5,
    active_icon_color:  COLOR_SHADES.blue.primary,

    primary_bg: COLOR_SHADES.gray.shade8,
    secondary_bg: COLOR_SHADES.gray.shade7,
    tintBg: COLOR_SHADES.blue.shade2


  },
};