import React, { useContext } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import ThemeContext from "../context/ThemeContext";

export default function Menu() {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <div className="menu uppercase font-general-semibold text-lg fixed flex justify-between top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="flex">
        <p>
          {" "}
      
            <AnimatedButton
              text={"meowseumofficial@gmail.com"}
              href="mailto:meowseumofficial@gmail.com"
            />
      
        </p>
        <button onClick={changeTheme} className="uppercase ml-10">
          <AnimatedButton text={"change colors"} />
        </button>
        <p className="ml-10">
          {" "}
      
            <AnimatedButton
              text={"privacy"}
              href="/privacy-policy"
            />
      
        </p>
        <p className="ml-10">
          {" "}
      
            <AnimatedButton
              text={"cookie"}
              href="/cookie-policy"
            />
      
        </p>
      </div>
      <div className="flex">
        <p className="mr-10">
          <AnimatedButton text={"meowseum"} href={"/"} />
        </p>
        <p className="mr-10">
       
        <AnimatedButton text={"about"} href={"/about"} />
        
        </p>
        <p>
          <AnimatedButton text={"submit photo"} />
        </p>
      </div>
    </div>
  );
}
