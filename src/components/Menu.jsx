import React, { useState, useContext } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import ThemeContext from "../context/ThemeContext";

export default function Menu() {
  const { changeTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu uppercase font-general-semibold text-lg fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="fixed top-4 left-4 z-[60] tablet:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 uppercase rounded-lg"
        >
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-0 scale-90 translate-x-2"
                : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            Menu
          </span>
          <span className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
            +
          </span>
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-90 translate-x-2"
            }`}
          >
            Close
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 backdrop-blur-2xl bg-[#dbdbdb]/30 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        } tablet:bg-transparent tablet:backdrop-blur-none tablet:opacity-100 tablet:visible tablet:translate-y-0 tablet:relative tablet:flex tablet:justify-between`}
      >
        <div className="flex flex-col tablet:flex-row tablet:items-center mobile:mt-20 tablet:mt-0 tablet:p-3 mobile:space-y-5 tablet:space-y-0">
          <p>
            <AnimatedButton
              text={"meowseumofficial@gmail.com"}
              href="mailto:meowseumofficial@gmail.com"
            />
          </p>
          <button onClick={changeTheme} className="uppercase tablet:ml-10 mobile:-mt-10 tablet:mt-0">
            <AnimatedButton text={"change colors"} />
          </button>
          <p className="tablet:ml-10 mobile:-mt-10 tablet:mt-0">
            <AnimatedButton text={"privacy"} href="/privacy-policy" />
          </p>
          <p className="tablet:ml-10 mobile:-mt-10 tablet:mt-0">
            <AnimatedButton text={"cookie"} href="/cookie-policy" />
          </p>
        </div>

        <div className="flex flex-col tablet:flex-row tablet:items-center space-y-5 tablet:space-y-0">
          <p className="tablet:mr-10">
            <AnimatedButton text={"meowseum"} href={"/"} />
          </p>
          <p className="tablet:mr-10 mobile:-mt-10 tablet:mt-0">
            <AnimatedButton text={"about"} href={"/about"} />
          </p>
          <p className="mobile:-mt-10 tablet:mt-0">
            <AnimatedButton text={"submit photo"} />
          </p>
        </div>
      </div>
    </div>
  );
}
