import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import '../node_modules/flowbite/dist/flowbite.min.js';
import { HelmetProvider } from "react-helmet-async";
import 'flowbite';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient(



)
createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster></Toaster>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </HelmetProvider>
);
