import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/HomePage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default App;