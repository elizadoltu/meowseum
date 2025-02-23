import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);
  const [isH2Animation, setIsH2Animation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    if (isMobile) {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
      return;
    }

    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - (isH2Animation ? 50 : 8),
        y: e.clientY - (isH2Animation ? 50 : 8),
        duration: 0.1,
      });
    };

    const defaultHoverTargets = document.querySelectorAll(
      "a, button, .hoverable, h1, p"
    );
    const h2AnimationTargets = document.querySelectorAll(".h2-animation");

    const handleMouseEnterDefault = () => {
      gsap.to(cursorRef.current, {
        scale: 1.3,
        backgroundColor: "#DBDBDB",
        duration: 0.2,
      });
      cursorRef.current.style.mixBlendMode = "difference";
    };

    const handleMouseLeaveDefault = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#DBDBDB",
        duration: 0.2,
      });
      cursorRef.current.style.mixBlendMode = "initial";
    };

    const handleMouseEnterH2Animation = () => {
      setIsH2Animation(true);
      gsap.to(cursorRef.current, {
        scale: 1.5,
        backgroundColor: "#050505",
        duration: 0.2,
      });
      cursorRef.current.style.mixBlendMode = "exclusion";
    };

    const handleMouseLeaveH2Animation = () => {
      setIsH2Animation(false);
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#DBDBDB",
        duration: 0.2,
      });
      cursorRef.current.style.mixBlendMode = "initial";
    };

    defaultHoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnterDefault);
      target.addEventListener("mouseleave", handleMouseLeaveDefault);
    });

    h2AnimationTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnterH2Animation);
      target.addEventListener("mouseleave", handleMouseLeaveH2Animation);
    });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.removeEventListener("mousemove", handleMouseMove);
      defaultHoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnterDefault);
        target.removeEventListener("mouseleave", handleMouseLeaveDefault);
      });
      h2AnimationTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnterH2Animation);
        target.removeEventListener("mouseleave", handleMouseLeaveH2Animation);
      });
    };
  }, [isH2Animation, isMobile]);

  if (isMobile) return null; 

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference ${
        isH2Animation
          ? "w-6 h-6 bg-green-500 flex justify-center items-center"
          : "w-3 h-3 bg-primary-white rounded-full"
      }`}
    ></div>
  );
};

export default Cursor;
