import { useFonts } from "expo-font"

export const useLoadFonts = () => {
  const isFontsLoaded = useFonts({
    'GeneralSans-400': require('../assets/fonts/GeneralSans-Regular.otf'),
		'GeneralSans-600': require('../assets/fonts/GeneralSans-Semibold.otf'),
		'GeneralSans-700': require('../assets/fonts/GeneralSans-Bold.otf'),
  });

  return isFontsLoaded;
}
