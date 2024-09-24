import React, { StrictMode, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from '@rneui/themed';

import { Main } from './screens/Main';
import { AuthProvider } from './context/Auth.context';
import { ProductProvider } from './context/Product.context';
import { theme } from './Theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <ProductProvider>
                  <Main></Main>
                </ProductProvider>
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
    </StrictMode>
  )
};

export default App;
