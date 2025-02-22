import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DynamicCursor from "../utils/DynamicCursor";

gsap.registerPlugin(ScrollTrigger);

const Profile = ({ name, firstParagraph, secondParagraph, image, linkedinLink }) => {
  const refTriggerElement = useRef([]);
  const refParagraphTarget = useRef([]);
  const imageRef = useRef([]);

  const handleMouseEnter = () => {
    refParagraphTarget.current.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        y: 0,
        ease: "power2.out",
      });
    });

    refTriggerElement.current.forEach((el) => {
      gsap.to(el, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    refParagraphTarget.current.forEach((el) => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        y: 20,
        ease: "power2.out",
      });
    });

    refTriggerElement.current.forEach((el) => {
      gsap.to(el, {
        y: 150,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    imageRef.current.forEach((el) => {
      gsap.fromTo(
      el,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
    })
    
  }, []);

  return (
    <div className="flex items-end leading-none mt-[20vh]">
        <DynamicCursor />
      <a
        href={ linkedinLink }
        target="_blank"
        className="w-full"
      >
        <img
          src={`/profile/${image}.png`}
          alt="one of the creators with a cat, eliza teodora doltu"
          data-cursor="To my LinkedIn profile"
          ref={(el) => el && imageRef.current.push(el)}
          style={{
            width: "95vh",
            height: "auto",
            display: "block",
            objectFit: "cover",
            clipPath: "inset(0 100% 0 0)",
            transition: "clip-path 0.3s ease-out",
          }}
        />
      </a>

      <div className="font-general-regular ml-5" data-cursor="To my LinkedIn profile">
        <h1
          className="uppercase font-mango-black text-12xl translate-y-36 transition-all duration-200 ease-out"
          ref={(el) => el && refTriggerElement.current.push(el)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="To my LinkedIn profile"
        >
          <a
            href={ linkedinLink }
            target="_blank"
            className="w-full"
          >
            { name }
          </a>
        </h1>
        <div
          className="opacity-0 grid grid-cols-2 gap-4 translate-y-5 transition-all duration-200 ease-out leading-6.5"
          ref={(el) => el && refParagraphTarget.current.push(el)}
        >
          <p>
            { firstParagraph }
          </p>
          <p>
            { secondParagraph }
          </p>
        </div>
      </div>
    </div>
  );
};
Profile.propTypes = {
  name: PropTypes.string.isRequired,
  firstParagraph: PropTypes.string.isRequired,
  secondParagraph: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkedinLink: PropTypes.string.isRequired,
};

export default Profile;
