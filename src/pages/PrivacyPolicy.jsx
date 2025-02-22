import React, { useRef, useEffect } from "react";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const leftTextRefs = useRef([]);
  const rightTextRefs = useRef([]);

  useEffect(() => {
    leftTextRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0 },
        {
          x: "-65%",
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
          x: "85%",
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
    <div className="size-container-ideal">
      <div className="uppercase font-mango-black flex justify-center text-11xl">
        <h1 ref={(el) => el && leftTextRefs.current.push(el)}>privacy</h1>
        <h1
          ref={(el) => el && rightTextRefs.current.push(el)}
          className="font-mango-italic"
        >
          policy
        </h1>
      </div>
      <div className="w-3xl font-general-regular">
        <p>
          This <span className="font-bold underline">Privacy Policy</span>{" "}
          explains how Meowseum &#40;"we," "us," or "our"&#41; collects, uses,
          and protects your information when you use our website and services.
          By using Meowseum,{" "}
          <span className="font-bold">
            you agree to the terms outlined in this Privacy Policy.
          </span>{" "}
          If you disagree with any part, you may not access our services. We
          take your privacy seriously. This policy breaks down what data we
          collect, how we use it, and what your options are to stay in control.
        </p>



        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          information we collect
        </h1>
        <p className="mt-4">When you interact with Meowseum, we may collect:</p>
        <p className="mt-2">
          <span className="font-bold underline">Your email address</span> – for
          communication purposes.
        </p>
        <p>
          <span className="font-bold underline">
            Your Twitter or Instagram handle or name
          </span>{" "}
          – if you choose to share it, we display it alongside your photo.
        </p>
        <p>
          <span className="font-bold underline">Your cat’s photo</span> –
          because that’s what we’re all about.
        </p>
        <p>
          {" "}
          <span className="font-bold underline">An optional message</span> – if
          you want to share a fun fact or story with us.
        </p>
        <p className="mt-2">
          We collect this data to verify and approve submissions, ensuring a
          safe and beautiful place for everyone.
        </p>
        <p className="mt-2">
          We don’t share your personally identifiable information publicly or
          with third parties, except when required by law.
        </p>



        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
            how do we use your information
        </h1>
        <p className="mt-2">
          <span className="font-bold">To approve and display cat photos</span> in the gallery.
        </p>
        <p>
          <span className="font-bold">
            To credit you properly
          </span>{" "}
          for your submission.
        </p>
        <p>
          <span className="font-bold">Maintain site functionality</span> –
          and security.
        </p>
        <p>
          {" "}
          <span className="font-bold">To analyze website performance</span> using Google Analytics
        </p>
        <p className="mt-2">We do NOT sell or rent your data.</p>



        <h1 className="font-general-semibold text-4xl uppercase mt-[20vh]">
          protection of information
        </h1>
        <p className="mt-2"><span className="font-bold underline">Meowseum</span> shares potentially personally identifiable information only with employees and contractors who:</p>
        <p className="ml-5">Have signed confidentiality agreements.</p>
        <p className="ml-5">Need the data to review, approve, or manage submissions.</p>
        <p className="mt-5">Some of these team members may be located outside your country. By using Meowseum<span className="font-bold">you consent to the transfer of your information where necessary.</span>, </p>
        <p className="mt-5">Outside of these cases, we disclose personal data only when:</p>
        <p className="ml-5">Legally required &#40;e.g., law enforcement requests&#41;.</p>
        <p className="ml-5">Necessary to protect Meowseum, its users, or the public.</p>
        <p className="mt-5">We implement security measures to protect your data, but <span className="font-bold">no online platform is 100% secure.</span> Please be mindful of what you share.</p>


        <h1 className="font-general-semibold text-4xl mt-[20vh] uppercase">
          COOKIES & ANALYTICS
        </h1>
        <p className="mt-2"><span className="font-bold">Yes, we use cookies</span>—but only to enhance your experience.</p>
        <p className="ml-5">No ad tracking.</p>
        <p className="ml-5">No creepy targeting.</p>
        <p className="ml-5">No annoying pop-ups.</p>
        <p>For more details, check out our <a href="/cookie-policy" className="font-bold underline">Cookie Policy.</a></p>
        <p className="mt-5">We use <span className="font-bold">Google Analytics</span> to understand how visitors interact with our site. This helps us <span className="font-bold">improve performance and make Meowseum even better.</span></p>
        <p className="mt-5">To learn more about Google’s data policies, visit <span className="font-bold underline">Google Analytics Data Policy.</span></p>

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
