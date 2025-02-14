import React, { useEffect, useRef } from "react";
import Menu from "../components/Menu";
import Cursor from "../utils/Cursor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRefAbout = useRef(null);
  const textContainerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

//   useEffect(() => {
//     const container = textContainerRef.current;
//     const p1 = textRef1.current;
//     const p2 = textRef2.current;
  
//     gsap.set([p1, p2], { opacity: 0 });
  
//     gsap.fromTo(
//       container,
//       { justifyContent: "center" },
//       {
//         justifyContent: "space-between",
//         duration: 1.5,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: container,
//           start: "top 90%", 
//           end: "top 50%",
//           scrub: 1,
//         },
//       }
//     );
  
//     gsap.fromTo(
//       [p1, p2],
//       { opacity: 0, x: 0 },
//       {
//         opacity: 1,
//         x: (index) => (index === 0 ? "-50px" : "50px"),
//         duration: 1.5,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: container,
//           start: "top 90%",
//           end: "top 50%",
//           scrub: 1,
//         },
//       }
//     );
//   }, []);
  


  useEffect(() => {
    if (!textRefAbout.current) return;

    const splitTextAbout = new SplitType(textRefAbout.current, {
      types: "chars, words, lines",
    });

    if (splitTextAbout.chars.length > 0) {
      gsap.from(splitTextAbout.chars, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRefAbout.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => splitTextAbout.revert();
  }, []);

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
        yPercent: -270,
        duration: 1,
        ease: "power3.inOut",
      })
      .to(".main-content", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
  }, []);

  return (
    <div className="w-full h-full">
      <Cursor />

      <div className="headline w-full flex justify-center items-end absolute leading-none bottom-0 left-0">
        <h1 className="font-dirtyline text-12xl headline-text uppercase">
          <span className="font-mango-black">about </span>meowseum
        </h1>
      </div>
      <div className="main-content relative pt-[40vh] opacity-0">
        <Menu />
        <div className="flex justify-center">
          <img
            src="/sticker-cat.png"
            alt="a sticker with a black cat"
            className="w-2xl"
          />
        </div>
        <div className="flex justify-center mt-[40vh]">
          <p
            className="flex justify-center text-center w-5xl font-mango-regular text-8xl"
            ref={textRefAbout}
          >
            MEOWSEUM is an app created by two people, just like you, who adore
            cats. Our goal? To build the world’s biggest cat gallery, a place
            where everyone can share their love for felines and enjoy endless
            adorable cat photos.
          </p>
        </div>
        {/* <div
          ref={textContainerRef}
          className="flex justify-center w-full px-10 mt-[40vh] text-[#dbdbdb] transition-all duration-500"
        >
          <p ref={textRef1} className="font-mango-regular text-4xl opacity-0">
  This is the first paragraph. It will shift left.
</p>
<p ref={textRef2} className="font-mango-regular text-4xl opacity-0">
  This is the second paragraph. It will shift right.
</p>

        </div> */}
      </div>
    </div>
  );
}
