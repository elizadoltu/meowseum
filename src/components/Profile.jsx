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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      refParagraphTarget.current.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
    }
  }, []);
  
  const handleMouseEnter = () => {
    if (window.innerWidth <= 768) return; 
  
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
    if (window.innerWidth <= 768) return;
  
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
          start: "top 110%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
    gsap.fromTo(
      el,
      { scale: 1.2 },
      {
        scale: 1.0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 110%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
    })
    
  }, []);

  return (
    <div className="flex tablet:flex-row mobile:flex-col tablet:items-end leading-none tablet:mt-[20vh] mobile:mt-[10vh]">
        <DynamicCursor />
        <p className="tablet:opacity-0 mb-1 font-general-regular text-sm">Click on the image to see my LinkedIn profile</p>
      <a
        href={ linkedinLink }
        target="_blank"
        className="w-full overflow-hidden"
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

      <div className="font-general-regular tablet:ml-5" data-cursor="To my LinkedIn profile">
        <h1
          className="uppercase font-mango-black tablet:text-12xl mobile:text-9xl mobile:mt-5 tablet:mt-0 tablet:translate-y-36 transition-all duration-200 ease-out"
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
          className="opacity-0 grid tablet:grid-cols-2 mobile:grid-cols-1 gap-4 translate-y-5 transition-all duration-200 ease-out leading-6.5 font-general-regular"
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
