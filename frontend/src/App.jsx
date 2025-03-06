import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import FaqPage from "./pages/FaqPage";
import ShippingReturnsPage from "./pages/ShippingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SizeCategoryPage from "./pages/SizeCategoryPage";
import HommePage from "./pages/HommePage";
import FemmePage from "./pages/FemmePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ConatcPage";

import { useUserStore } from "./store/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/shipping" element={<ShippingReturnsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="/shop/:slug" element={<SizeCategoryPage />} />{" "}
        <Route path="/homme" element={<HommePage />} />
        <Route path="/femme" element={<FemmePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
