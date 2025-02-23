import React, { useEffect } from "react";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Cursor from "../utils/Cursor";
import gsap from "gsap";
import GridGallery from "../utils/GridTemplate";
import ScrollToTop from "../hooks/ScrollToTop";

export default function Main() {
  ScrollToTop();

    useEffect(() => {
        const tl = gsap.timeline();

        gsap.set(".main-content", { opacity: 0 });
        gsap.set(".headline", { yPercent: 100 }); 

        tl.to(".headline", {
          yPercent: 0,  
          duration: 1.2,
          ease: "power4.out",
        })
        .to(".headline", {
          yPercent: -190, 
          duration: 1,
          ease: "power3.inOut"
        })
        .to(".main-content", {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });
    }, []);

    return (
      <div className="size-container-ideal main overflow-hidden">
        <Cursor />
        <div className="headline w-full flex justify-center items-end absolute leading-none bottom-0 left-0">
          <h1 className="font-dirtyline text-11xl headline-text uppercase">
            meowseum
          </h1>
        </div>
        <div className="main-content main relative pt-[40vh] opacity-0">
          <img
            src="/sticker-cat.png"
            alt="a sticker with a cute cat"
            className="w-3xl flex left-1/2 translate-x-2/3"
          />
          <GridGallery />
          <Contact />
          <Menu />
        </div>
      </div>
    );
}
