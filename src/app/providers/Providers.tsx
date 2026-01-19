'use client';

import { ConfigProvider } from 'antd';
import QueryProvider from './QueryProvider';
import { ToastContainer, Bounce } from 'react-toastify';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <QueryProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </QueryProvider>
    </ConfigProvider>
  );
}
