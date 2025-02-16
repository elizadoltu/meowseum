import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "../styles/dynamic-cursor.css";

const DynamicCursor = () => {
  const cursorRef = useRef(null);
  const cursorParagraphRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [textTimeout, setTextTimeout] = useState(null);

  useEffect(() => {
    const cursorItem = cursorRef.current;
    const cursorParagraph = cursorParagraphRef.current;
    const targets = document.querySelectorAll("[data-cursor]"); 
    const xOffset = 6;
    const yOffset = 140;

    gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });

    const xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
    const yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const cursorX = e.clientX;
      const cursorY = e.clientY + scrollY;

      let xPercent = xOffset;
      let yPercent = yOffset;

      const cursorEdgeThreshold = cursorItem.offsetWidth + 16;
      if (cursorX > windowWidth - cursorEdgeThreshold) {
        xPercent = -100;
      }

      if (cursorY > scrollY + windowHeight * 0.9) {
        yPercent = -120;
      }

      gsap.to(cursorItem, { xPercent, yPercent, duration: 0.9, ease: "power3" });
      xTo(cursorX);
      yTo(cursorY - scrollY);
    };

    const mouseEnterHandler = (target) => {
      setCurrentTarget(target);
      setCursorVisible(true);
      const newText = target.getAttribute("data-cursor");
      
      if (textTimeout) clearTimeout(textTimeout); // Clear previous timeout
      setTextTimeout(setTimeout(() => {
        cursorParagraph.innerHTML = newText;
        setCursorText(newText);
      }, 100)); // Delay cursor text update for smoother transition
    };

    const mouseLeaveHandler = () => {
      setCurrentTarget(null);
      setCursorVisible(false);
      if (textTimeout) clearTimeout(textTimeout); // Clear timeout when mouse leaves
      setTextTimeout(setTimeout(() => {
        cursorParagraph.innerHTML = "";
        setCursorText("");
      }, 100)); // Delay cursor text removal
    };

    window.addEventListener("mousemove", handleMouseMove);

    targets.forEach((target) => {
      target.addEventListener("mouseenter", () => mouseEnterHandler(target));
      target.addEventListener("mouseleave", mouseLeaveHandler);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", () => mouseEnterHandler(target));
        target.removeEventListener("mouseleave", mouseLeaveHandler);
      });
    };
  }, [cursorText, textTimeout]);

  return (
    <div>
      <div
        className={`cursor ${cursorVisible ? "visible" : ""}`}
        ref={cursorRef}
        style={{
          opacity: cursorVisible ? 1 : 0, 
        }}
      >
        <p className="cursor-paragraph" ref={cursorParagraphRef}></p>
      </div>
    </div>
  );
};

export default DynamicCursor;
