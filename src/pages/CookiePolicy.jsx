import React, { useRef, useEffect } from "react";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Cursor from "../utils/Cursor";
import ScrollToTop from "../hooks/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

export default function CookiePolicy() {
  ScrollToTop();
  const leftTextRefs = useRef([]);
  const rightTextRefs = useRef([]);

  useEffect(() => {

    const isMobile = window.innerWidth <= 768; 
    
    leftTextRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0 }, 
        {
          x: isMobile ? 0 : -window.innerWidth * 0.21, 
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
          x: isMobile ? 0 : window.innerWidth * 0.19, 
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

  return (
    <div className="size-container-ideal overflow-x-hidden">
      <Cursor />
      <div className="uppercase font-mango-black flex justify-center desktop:text-11xl tablet:text-11xl mobile:text-8xl mobile:mt-10">
        <h1 ref={(el) => el && leftTextRefs.current.push(el)}>cookie</h1>
        <h1
          ref={(el) => el && rightTextRefs.current.push(el)}
          className="font-mango-italic"
        >
          policy
        </h1>
      </div>
      <div className="desktop:w-3xl tablet:w-3xl mobile:w-1xl font-general-regular">
        <p>
          This <span className="font-bold underline">Cookie Policy</span>{" "}
          explains what cookies are, how we use them, and your options regarding
          their usage. By using Meowseum,{" "}
          <span className="font-bold">
            you agree to the use of cookies as described in this policy.
          </span>{" "}
          If you prefer to limit or disable cookies, you can adjust your browser
          settings at any time.
        </p>
        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          what are cookies
        </h1>
        <p className="mt-4">
          Cookies are small text files stored on your device when you visit a
          website. They help websites remember your preferences, improve
          performance, and provide analytics. Cookies{" "}
          <span className="font-bold">
            do not contain personal data like your name or email
          </span>{" "}
          unless you explicitly provide it.
        </p>
        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          how we use cookies
        </h1>
        <div></div>
        <p className="mt-4">Meowseum uses cookies to:</p>
        <ul className="ml-4">
          <li>
            <span className="font-bold underline">Enhance your experience</span>{" "}
            – Remembering preferences for a smoother visit.
          </li>
          <li>
            <span className="font-bold underline">
              Analyze site performance
            </span>{" "}
            – We use Google Analytics to understand how visitors interact with
            the website.
          </li>
        </ul>
        <p>We do not use cookies for advertising or intrusive tracking.</p>
        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          types of cookies that we use
        </h1>
        <h1 className="font-general-semibold text-2xl mt-8 uppercase">
          essential cookies
        </h1>
        <p className="mt-4">
          These cookies are required for the site to function properly. They
          enable core features such as{" "}
          <span className="font-bold">navigation and security.</span>
        </p>
        <h1 className="font-general-semibold text-2xl mt-8 uppercase">
          analytics cookies
        </h1>
        <p className="mt-4">
          We use <span className="font-bold">Google Analytics</span> to collect
          anonymous data on how visitors interact with Meowseum. This helps us{" "}
          <span className="font-bold">
            improve performance and optimize the user experience.
          </span>
        </p>

        <p className="mt-4">
          You can learn more about Google Analytics and how it handles data by
          visiting{" "}
          <span className="font-bold underline">Google’s Privacy Policy.</span>
        </p>
        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          managing cookies
        </h1>
        <p className="mt-4">
          You have control over how cookies are used:
          <span className="font-bold underline"> Browser Settings</span> – Most
          browsers allow you to block or delete cookies in the settings menu.
        </p>
        <p className="mt-2">
          <span className="font-bold underline">Please note:</span> Disabling
          cookies may affect some features of{" "}
          <span className="font-bold">Meowseum</span>.
        </p>
        <h1 className="font-general-semibold text-4xl mt-[20vh] uppercase">
          contact us
        </h1>
        <p className="mt-4">
          Got questions? Need your data removed? Just want to say hi?
          <a
            href="mailto:meowseumofficial@gmail.com"
            className="font-bold uppercase underline"
          >
            meowseumofficial@gmail.com
          </a>
        </p>
      </div>
      <Menu />
      <Contact />
    </div>
  );
}
