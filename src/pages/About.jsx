import React, { useEffect, useRef } from "react";
import Menu from "../components/Menu";
import Cursor from "../utils/Cursor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Contact from "../components/Contact";
import Profile from "../components/Profile";
import ScrollToTop from "../hooks/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  ScrollToTop();
  const textRefAbout = useRef(null);
  const leftTextRefs = useRef([]);
  const rightTextRefs = useRef([]);
  const elementsRef = useRef([]);
  const textRefCreator = useRef(null);

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
        yPercent: isMobile ? -window.innerHeight * 1.5 : -270,
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
    const isMobile = window.innerWidth <= 768;

    leftTextRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0 },
        {
          x: isMobile? 0 : -window.innerWidth * 0.1,
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
          x: isMobile? 0 : window.innerWidth * 0.1,
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


  return (
    <div className="size-container-ideal about overflow-x-hidden">
      <Cursor />
      <div className="headline w-full flex justify-center items-end absolute leading-none bottom-0 left-0">
        <h1 className="font-dirtyline tablet:text-[11rem] desktop:text-12xl mobile:text-[2.5rem] headline-text uppercase">
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
            className="flex justify-center text-center w-5xl font-mango-regular tablet:text-8xl mobile:text-5xl"
            ref={textRefAbout}
          >
            MEOWSEUM is an app created by two people, just like you, who adore
            cats. Our goal? To build the world’s biggest cat gallery, a place
            where everyone can share their love for felines and enjoy endless
            adorable cat photos.
          </p>
        </div>
        <div className="mt-[40vh]">
          <div className="uppercase font-mango-black flex justify-center desktop:text-11xl tablet:text-12xl mobile:text-6xl">
            <h1 ref={(el) => el && leftTextRefs.current.push(el)}>how</h1>
            <h1 ref={(el) => el && rightTextRefs.current.push(el)}>
              does it <span className="font-mango-italic">work</span>
            </h1>
          </div>
          <div className="grid tablet:grid-cols-2 mobile:grid-cols-1 font-general-regular">
            <h1
              className="uppercase font-general-semibold"
              ref={(el) => el && elementsRef.current.push(el)}
            >
              share your cat's moment
            </h1>
            <p
              ref={(el) => el && elementsRef.current.push(el)}
              className="tablet:w-3xl text-lg"
            >
              Upload your cat's photo by filling out a simple form. You’ll need:
              A photo of your cat; Your Instagram/Twitter
              account or just your name (so we can give you credit!) (Optional)
              A short message for us
            </p>

            <h1
              className="uppercase font-general-semibold mt-20 "
              ref={(el) => el && elementsRef.current.push(el)}
            >
              Photo Review for Safety
            </h1>
            <p
              ref={(el) => el && elementsRef.current.push(el)}
              className="tablet:w-3xl text-lg tablet:mt-20"
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
              className="tablet:w-3xl tablet:mt-20 text-lg"
            >
              After approval, your cat’s photo will appear on the main page,
              along with your Instagram handle!
            </p>
          </div>
        </div>
        <div className="flex justify-end uppercase tablet:text-10xl mobile:text-[5.5rem] font-mango-black mt-[20vh] px-5">
          <h1 ref={textRefCreator}>
            the <span className="font-mango-italic">creators</span>
          </h1>
        </div>

        <Profile name={"eliza"} 
        firstParagraph={"Hello, my name is Eliza-Teodora Doltu, and I am one of the creators of MEOWSEUM. Ever since I can remember, I’ve wanted to express my creativity and bring something beautiful to life."}
        secondParagraph={"Just like websites tell a story through images, colors, and fonts, MEOWSEUM tells a story through cats—their personalities, their charm, and the joy they bring to us."}
        image={"eliza"}
        linkedinLink={"https://www.linkedin.com/in/eliza-teodora-doltu-56336b24a/"}
        />
        <Profile 
          name={"raul"}
          firstParagraph={"My name is Raul, a computer science student passionate about web development and software engineering. I love coding for its blend of logic and creativity,"}
          secondParagraph={"building efficient applications while exploring new technologies. I'm always eager to learn, experiment, and stay updated with the latest advancements."}
          image={"raul"}
          linkedinLink={"https://www.linkedin.com/in/raul-cosmin-onceriu-3ba749259/"}
        />
        <div className="main-content relative pt-[60vh] opacity-0 overflow-hidden">
          <Contact />
        </div>
      </div>
    </div>
  );
}
