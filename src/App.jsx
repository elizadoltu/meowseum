import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import "./index.css";
import "./global/dirtyline.css";
import "./global/mangogrotesque.css";
import "./global/general-sans.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Cursor from "./utils/Cursor";
import { ParallaxProvider } from "react-scroll-parallax";
import Form from "./utils/Form";

gsap.registerPlugin(ScrollTrigger);

const Main = lazy(() => import("./pages/Main"));
const About = lazy(() => import("./pages/About"));
const Page404 = lazy(() => import("./pages/404"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <ParallaxProvider>
      <Cursor />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Main />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivacyPolicy />
              </Suspense>
            }
          />

          <Route
            path="/cookie-policy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CookiePolicy />
              </Suspense>
            }
          />
          <Route
            path="/submit-photo"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Form />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Page404 />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </ParallaxProvider>
  );
}
