import type { AppProps } from 'next/app';
import 'antd/dist/reset.css'; // antd v5 reset
import '../styles/globals.css'; // tailwind directives

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
