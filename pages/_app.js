import "../styles/globals.css";
import { wrapper } from "../redux/store";
import { ContextProvider } from "../utils/Context";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default wrapper.withRedux(MyApp);
