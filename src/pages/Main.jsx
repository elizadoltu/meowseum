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
      const isMobile = window.innerWidth <= 768;
        const tl = gsap.timeline();

        gsap.set(".main-content", { opacity: 0 });
        gsap.set(".headline", { yPercent: 100 }); 

        tl.to(".headline", {
          yPercent: 0,  
          duration: 1.2,
          ease: "power4.out",
        })
        .to(".headline", {
          yPercent: isMobile ? -window.innerHeight * 1.5 : -190, 
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
          <h1 className="font-dirtyline desktop:text-11xl tablet:text-14xl mobile:text-[3rem] headline-text uppercase">
            meowseum
          </h1>
        </div>
        <div className="main-content main relative pt-[40vh] opacity-0">
        <img
            src="/sticker-cat.png"
            alt="a sticker with a cute cat"
            className="desktop:w-3xl tablet:w-3xl mobile:w-96 flex left-1/2 mobile:mt-10 desktop:mt-0 tablet:mt-0 desktop:translate-x-2/3 tablet:translate-x-2/5"
          />
          <GridGallery />
          <Contact />
          <Menu />
        </div>
      </div>
    );
}
