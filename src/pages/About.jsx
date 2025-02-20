import React, { useEffect, useRef } from "react";
import Menu from "../components/Menu";
import Cursor from "../utils/Cursor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Contact from "../components/Contact";
import DynamicCursor from "../utils/DynamicCursor";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRefAbout = useRef(null);
  const leftTextRefs = useRef([]);
  const rightTextRefs = useRef([]);
  const elementsRef = useRef([]);
  const textRefCreator = useRef(null);
  const refParagraphTarget = useRef(null);
  const refTriggerElement = useRef(null);
  const imageRef = useRef(null);

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

  useEffect(() => {
    leftTextRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0 },
        {
          x: -260,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    rightTextRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0 },
        {
          x: 240,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(refParagraphTarget.current, {
      opacity: 1,
      duration: 0.5,
      y: 0,
      ease: "power2.out",
    });

    gsap.to(refTriggerElement.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(refParagraphTarget.current, {
      opacity: 0,
      duration: 0.5,
      y: 20,
      ease: "power2.out",
    });

    gsap.to(refTriggerElement.current, {
      y: 150,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    elementsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      textRefCreator.current,
      {
        x: -500,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRefCreator.current,
          start: "top 100%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 100%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div className="size-container-ideal about">
      <Cursor />
      <div className="headline w-full flex justify-center items-end absolute leading-none bottom-0 left-0">
        <h1 className="font-dirtyline text-12xl headline-text uppercase">
          <span className="font-mango-black">about </span>meowseum
        </h1>
      </div>
      <div className="size-container-ideal main-content relative pt-[40vh] opacity-0">
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
        <div className="mt-[40vh]">
          <div className="uppercase font-mango-black flex justify-center text-11xl">
            <h1 ref={(el) => el && leftTextRefs.current.push(el)}>how</h1>
            <h1 ref={(el) => el && rightTextRefs.current.push(el)}>
              does it <span className="font-mango-italic">work</span>
            </h1>
          </div>
          <div className="grid grid-cols-2 font-general-regular">
            <h1
              className="uppercase font-general-semibold"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              share your cat's moment
            </h1>
            <p
              ref={(el) => el && elementsRef.current.push(el)}
              className="w-3xl text-lg"
            >
              Upload your cat's photo by filling out a simple form. You’ll need:
              Your email address A photo of your cat Your Instagram/Twitter
              account or just your name (so we can give you credit!) (Optional)
              A short message for us
            </p>

            <h1
              className="uppercase font-general-semibold mt-20"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              Photo Review for Safety
            </h1>
            <p
              ref={(el) => el && elementsRef.current.push(el)}
              className="w-3xl text-lg mt-20"
            >
              Once submitted, we personally review each photo to ensure the
              gallery stays a safe and positive space.
            </p>

            <h1
              className="uppercase font-general-semibold mt-20"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              Approval & Feature
            </h1>
            <p
              ref={(el) => el && elementsRef.current.push(el)}
              className="w-3xl mt-20 text-lg"
            >
              After approval, your cat’s photo will appear on the main page,
              along with your Instagram handle!
            </p>
          </div>
        </div>
        <div className="flex justify-end uppercase text-10xl font-mango-black mt-[20vh] px-5">
          <h1 ref={textRefCreator}>
            the <span className="font-mango-italic">creators</span>
          </h1>
        </div>
        <div className="flex items-end leading-none">
          <DynamicCursor />
          <a
            href="https://www.linkedin.com/in/eliza-teodora-doltu-56336b24a/"
            target="_blank"
            className="w-full"
          >
            <img
              src="/eliza.png"
              alt="one of the creators with a cat, eliza teodora doltu"
              data-cursor="To my LinkedIn profile"
              ref={imageRef}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                clipPath: "inset(0 100% 0 0)",
                transition: "clip-path 0.3s ease-out",
              }}
            ></img>
          </a>

          <div
            className="font-general-regular ml-5"
            data-cursor="To my linkedin profile"
          >
            <h1
              className="uppercase font-mango-black text-12xl translate-y-36 transition-all duration-200 ease-out"
              ref={refTriggerElement}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-cursor="To my LinkedIn profile"
            >
              <a
                href="https://www.linkedin.com/in/eliza-teodora-doltu-56336b24a/"
                target="_blank"
                className="w-full"
              >
                {" "}
                eliza{" "}
              </a>
            </h1>
            <div
              className="opacity-0 grid grid-cols-2 gap-4 translate-y-5 transition-all duration-200 ease-out leading-6.5"
              ref={refParagraphTarget}
            >
              <p>
                Hello, my name is Eliza-Teodora Doltu, and I am one of the
                creators of MEOWSEUM. Ever since I can remember, I’ve wanted to
                express my creativity and bring something beautiful to life.
              </p>
              <p>
                Just like websites tell a story through images, colors, and
                fonts, MEOWSEUM tells a story through cats—their personalities,
                their charm, and the joy they bring to us.
              </p>
            </div>
          </div>
        </div>
        <div className="main-content relative pt-[60vh] opacity-0 overflow-hidden">
          <Contact />
        </div>
      </div>
    </div>
  );
}
