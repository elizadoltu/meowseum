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
    <div className="uppercase leading-64 contact">
      {showCursor && <CursorContact />}
      <div className="flex">
        <h1 className="font-mango-black text-10xl mt-28" ref={addToRefs}>
          the world's
        </h1>
        <img
          src="/cat-contact.png"
          alt="one cat"
          className="absolute left-3/8 mt-20"
        />
      </div>
      <h1 className="font-mango-italic text-10xl" ref={addToRefs}>
        biggest
      </h1>
      <h1 className="font-mango-black flex justify-end text-10xl" ref={addToRefs}>
        <span className="font-mango-iblack mr-10">cat</span> gallery
      </h1>
      <h1 className="font-mango-black text-10xl" ref={addToRefs}>
        a <span className="font-mango-italic mr-20">wonderland </span>for
      </h1>
      <div className="flex text-10xl">
        <div>
          <h1 className="font-mango-black" ref={addToRefs}>
            <span className="font-mango-iblack mr-20">cat </span>lovers
          </h1>
          <div className="flex justify-between font-general-semibold text-lg -mt-12 z-50 relative">
            <p>
              <AnimatedButton text={"submit photo"} />
            </p>
            <p>
              <AnimatedButton text={"meowseumofficial@gmail.com"} href={"mailto:meowseumofficial@gmail.com"}/>
            </p>
          </div>
        </div>
        <img
          src="/cat-contact-2.png"
          alt="a sticker with a cat at spa"
          className="absolute left-3/7 -mt-28 ml-10"
        />
      </div>
      <div className="leading-none">
        <div className="mt-96 flex flex-col justify-center">
          <h1 className="font-dirtyline text-11xl" ref={mergeRefs(addToRefs, title)}>
            meowseum
          </h1>
          <img
            src="/sticker-cat.png"
            alt="a sticker with a cute cat"
            className="w-3xl flex left-1/2 translate-x-2/3"
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
