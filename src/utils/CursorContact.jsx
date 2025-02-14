import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/cursor-contact.css";

gsap.registerPlugin(ScrollTrigger);

const CursorContact = () => {
  const trailRef = useRef(null);

  useEffect(() => {
    const initImageTrail = (config = {}) => {
      const options = {
        minWidth: config.minWidth ?? 992,
        moveDistance: config.moveDistance ?? 15,
        stopDuration: config.stopDuration ?? 300,
        trailLength: config.trailLength ?? 5,
      };

      const wrapper = trailRef.current;

      if (!wrapper || window.innerWidth < options.minWidth) return;

      const state = {
        trailInterval: null,
        globalIndex: 0,
        last: { x: 0, y: 0 },
        trailImageTimestamps: new Map(),
        trailImages: Array.from(wrapper.querySelectorAll('[data-trail="item"]')),
        isActive: false,
      };

      const MathUtils = {
        lerp: (a, b, n) => (1 - n) * a + n * b,
        distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
      };

      function getRelativeCoordinates(e, rect) {
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }

      function activate(trailImage, x, y) {
        if (!trailImage) return;

        const rect = trailImage.getBoundingClientRect();
        Object.assign(trailImage.style, {
          left: `${x - rect.width / 2}px`,
          top: `${y - rect.height / 2}px`,
          zIndex: state.globalIndex,
          display: "block",
        });

        state.trailImageTimestamps.set(trailImage, Date.now());

        gsap.fromTo(
          trailImage,
          { autoAlpha: 0, scale: 0.8 },
          { scale: 1, autoAlpha: 1, duration: 0.2, overwrite: true }
        );

        state.last = { x, y };
      }

      function fadeOutTrailImage(trailImage) {
        if (!trailImage) return;
        gsap.to(trailImage, {
          opacity: 0,
          scale: 0.2,
          duration: 0.8,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(trailImage, { autoAlpha: 0 });
          },
        });
      }

      function handleOnMove(e) {
        if (!state.isActive) return;
        const rectWrapper = wrapper.getBoundingClientRect();
        const { x: relativeX, y: relativeY } = getRelativeCoordinates(e, rectWrapper);

        const distanceFromLast = MathUtils.distance(
          relativeX,
          relativeY,
          state.last.x,
          state.last.y
        );

        if (distanceFromLast > window.innerWidth / options.moveDistance) {
          const lead = state.trailImages[state.globalIndex % state.trailImages.length];
          const tail = state.trailImages[(state.globalIndex - options.trailLength) % state.trailImages.length];

          activate(lead, relativeX, relativeY);
          fadeOutTrailImage(tail);
          state.globalIndex++;
        }
      }

      function cleanupTrailImages() {
        const currentTime = Date.now();
        for (const [trailImage, timestamp] of state.trailImageTimestamps.entries()) {
          if (currentTime - timestamp > options.stopDuration) {
            fadeOutTrailImage(trailImage);
            state.trailImageTimestamps.delete(trailImage);
          }
        }
      }

      function startTrail() {
        if (state.isActive) return;

        state.isActive = true;
        wrapper.addEventListener("mousemove", handleOnMove);
        state.trailInterval = setInterval(cleanupTrailImages, 100);
      }

      function stopTrail() {
        if (!state.isActive) return;

        state.isActive = false;
        wrapper.removeEventListener("mousemove", handleOnMove);
        clearInterval(state.trailInterval);
        state.trailInterval = null;

        state.trailImages.forEach(fadeOutTrailImage);
        state.trailImageTimestamps.clear();
      }

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: startTrail,
        onEnterBack: startTrail,
        onLeave: stopTrail,
        onLeaveBack: stopTrail,
      });

      const handleResize = () => {
        if (window.innerWidth < options.minWidth && state.isActive) {
          stopTrail();
        } else if (window.innerWidth >= options.minWidth && !state.isActive) {
          startTrail();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        stopTrail();
        window.removeEventListener("resize", handleResize);
      };
    };

    const cleanup = initImageTrail({
      minWidth: 992,
      moveDistance: 15,
      stopDuration: 350,
      trailLength: 8,
    });

    return cleanup;
  }, []);

  return (
    <div ref={trailRef} data-trail="wrapper" className="trail-section">
      <div className="trail-wrap">
        <div className="trail-list">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} data-trail="item" className="trail-item">
              <img
                src={`/cat-trail-${index + 1}.png`}
                alt=""
                className="trail-item__img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CursorContact;
