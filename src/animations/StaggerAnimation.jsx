import React from "react";
import "../styles/stagger-animation.css";

const AnimatedButton = ({ text, number, href }) => {
  return (
    <a href={href} aria-label={text} className="menu-link w-inline-block btn-animate-chars">
      <span data-button-animate-chars className="menu-link-heading btn-animate-chars__text">
        {text.split("").map((char, index) => (
          <span key={index} className="btn-char" style={{ transitionDelay: `${index * 0.02}s` }}>
            {char === " " ? "\u00A0" : char} 
          </span>
        ))}
      </span>
    </a>
  );
};

export default AnimatedButton;