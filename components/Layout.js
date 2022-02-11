import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cart from "./cart/Cart";
import Profile from "./Profile";
import Footer from "./Footer";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <div className="content glob-trans">
      <Loading loading={loading} />
      <Navbar />
      <Sidebar />
      <Cart />
      <Profile />
      {children}
      <Footer />
    </div>
  );
}
