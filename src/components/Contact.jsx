import React, { useState, useEffect, useRef } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import CursorContact from "../utils/CursorContact";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useParallax } from "react-scroll-parallax";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [showCursor, setShowCursor] = useState(false);
  const textRefs = useRef([]);
  const parallaxConfig = {
    title: {
      translateY: [70, -45], speed: 10, easing: "easeInOutQuad"
    }
  };

  const { ref: title } = useParallax(parallaxConfig.title); 

  const mergeRefs = (...refs) => (el) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref && typeof ref === "object") {
        ref.current = el;
      }
    });
  };

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!textRefs.current.length) return;

    const splitInstances = textRefs.current.map((el) => {
      if (!el) return null;
      return new SplitType(el, { types: "chars" });
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: textRefs.current[0], 
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    splitInstances.forEach((splitText, index) => {
      if (!splitText) return;
      timeline.from(
        splitText.chars,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
        `-=${index * 0.5}` 
      );
    });

    return () => {
      splitInstances.forEach((splitText) => splitText?.revert());
    };
  }, []);

  useEffect(() => {
    setShowCursor(true);
    return () => setShowCursor(false);
  }, []);

  return (
    <div className="uppercase contact leading-none">
      {showCursor && <CursorContact />}
      <div className="flex">
        <h1 className="font-mango-black deskop:text-10xl tablet:text-10xl mobile:text-7xl mt-28 tablet:leading-40 mobile:leading-10" ref={addToRefs}>
          the world's
        </h1>
        <img
          src="/cat-contact.png"
          alt="one cat"
          className="absolute left-3/8 mt-20 mobile:w-40 desktop:w-auto tablet:w-auto"
        />
      </div>
      <h1 className="font-mango-italic deskop:text-10xl tablet:text-10xl mobile:text-7xl " ref={addToRefs}>
        biggest
      </h1>
      <h1 className="font-mango-black flex justify-end deskop:text-10xl tablet:text-10xl mobile:text-7xl tablet:leading-40 mobile:leading-10" ref={addToRefs}>
        <span className="font-mango-iblack mr-10">cat</span> gallery
      </h1>
      <h1 className="font-mango-black deskop:text-10xl tablet:text-10xl mobile:text-7xl" ref={addToRefs}>
        a <span className="font-mango-italic tablet:mr-20 mobile:mr-20">wonderland </span>for
      </h1>
      <div className="flex deskop:text-10xl tablet:text-10xl mobile:text-7xl">
        <div>
          <h1 className="font-mango-black tablet:leading-40 mobile:leading-10" ref={addToRefs}>
            <span className="font-mango-iblack desktop:mr-20 tablet:mr-20 mobile:mr-10">cat </span>lovers
          </h1>
          <div className="flex desktop:flex-row tablet:flex-row mobile:flex-col justify-between font-general-semibold desktop:text-lg tablet:text-lg mobile:text-sm  z-50 relative">
            <p>
              <AnimatedButton text={"submit photo"} href={"/submit-photo"}/>
            </p>
            <p>
              <AnimatedButton text={"meowseumofficial@gmail.com"} href={"mailto:meowseumofficial@gmail.com"}/>
            </p>
          </div>
        </div>
        <img
          src="/cat-contact-2.png"
          alt="a sticker with a cat at spa"
          className="absolute desktop:left-3/7 tablet:left-3/7 mobile:left-3/5 desktop:-mt-28 tablet:-mt-28 mobile:-mt-10 desktop:ml-10 tablet:ml-10 mobile:w-30 desktop:w-auto tablet:auto"
        />
      </div>
      <div className="leading-none">
        <div className="desktop:mt-96 tablet:mt-50 mobile:mt-24 flex flex-col justify-center">
          <h1 className="font-dirtyline desktop:text-11xl tablet:text-14xl mobile:text-[3rem]" ref={mergeRefs(addToRefs, title)}>
            meowseum
          </h1>
          <img
            src="/sticker-cat.png"
            alt="a sticker with a cute cat"
            className="desktop:w-3xl tablet:w-3xl mobile:w-96 flex left-1/2 mobile:mt-10 desktop:mt-0 tablet:mt-0 desktop:translate-x-2/3 tablet:translate-x-2/5"
          />
        </div>
        <div className="flex text-sm justify-between font-general-semibold">
          <p>©ALL RIGHTS RESERVED</p>
          <p>BY RAUL & ELIZA. 2025</p>
        </div>
      </div>
    </div>
  );
}
