import {
  FC,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { ScriptProps } from 'next/script';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { theme, lightTheme, darkTheme } from '@/theme';

type ContextProps = {
  toggleColorMode: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = createContext<ContextProps>({
  toggleColorMode: (theme: 'light' | 'dark') => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: FC<ScriptProps> = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
  const colorTheme = useMemo(
    () => ({ light: lightTheme, dark: darkTheme }),
    []
  );

  useEffect(() => {
    const data = localStorage.getItem('chakra-ui-color-mode');
    if (data === 'light' || data === 'dark') {
      setIsLightTheme(data === 'light');
    }
  });

  const chakraTheme = extendTheme(theme, {
    colors: colorTheme[isLightTheme ? 'light' : 'dark'],
  });

  const toggleColorMode = (theme: 'light' | 'dark') =>
    setIsLightTheme(theme === 'light');

  return (
    <ThemeContext.Provider
      value={{
        toggleColorMode,
      }}
    >
      <ChakraProvider
        theme={chakraTheme}
        toastOptions={{ defaultOptions: { position: 'top' } }}
      >
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};
