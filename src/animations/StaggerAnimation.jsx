import React from "react";
import PropTypes from "prop-types";
import "../styles/stagger-animation.css";

const AnimatedButton = ({ text, href }) => {
  return (
    <a href={href} aria-label={text} className="menu-link w-inline-block btn-animate-chars">
      <span data-button-animate-chars className="menu-link-heading btn-animate-chars__text">
        {text.split("").map((char, index) => (
          <span key={`${char}-${index}`} className="btn-char" style={{ transitionDelay: `${index * 0.02}s` }}>
            {char === " " ? "\u00A0" : char} 
          </span>
        ))}
      </span>
    </a>
  );
};
AnimatedButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default AnimatedButton;
