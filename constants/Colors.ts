


export const COLOR_SHADES = {
  blue: {
    /**
     * #ffe7eb

     *  */ 
    primary: '#0F66FF',
    secondary: '#D1E5FF',
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
    text: COLOR_SHADES.blue.shade8,
    background: COLOR_SHADES.gray.shade1,
    tintBg:COLOR_SHADES.blue.shade5

  },
  dark: {
    text: COLOR_SHADES.blue.shade1,
    background: COLOR_SHADES.blue.shade8,
    tintBg:COLOR_SHADES.blue.shade2


  },
};