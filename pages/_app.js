import { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const desiredChainId = 137;
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp
