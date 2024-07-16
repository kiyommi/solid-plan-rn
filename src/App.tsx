import React, { StrictMode } from 'react';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/Auth.context';
import { theme } from './Theme';
import { Main } from './screens/Main';

const App = () => {
  return (
    <StrictMode>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <Main></Main>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
    </StrictMode>
  )
};
export default App;
