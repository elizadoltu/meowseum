import React, { useState } from "react";
import AnimatedButton from "../animations/StaggerAnimation";

export default function Menu() {
  const backgroundColors = [
    "#1d1616",
    "#ffd65a",
    "#006a67",
    "#fffaec",
    "#4b5945",
    "#16423c",
    "#dbdbdb",
    "#050505",
  ];
  const fontColors = [
    "#8e1616",
    "#f93827",
    "#16c47f",
    "#578e7e",
    "#b2c9ad",
    "#ff6500",
    "#050505",
    "#dbdbdb",
  ];

  const [themeIndex, setThemeIndex] = useState(0);

  const changeTheme = () => {
    const newIndex = (themeIndex + 1) % fontColors.length;
    setThemeIndex(newIndex);

    document.body.style.color = fontColors[newIndex];
    document.body.style.backgroundColor = backgroundColors[newIndex];
  };

  return (
    <div className="uppercase font-switzer-semibold text-lg fixed flex justify-between top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="flex">
        <p>
          {" "}
          <a href="mailto:meowseumofficial@gmail.com">
            <AnimatedButton text={"meowseumofficial@gmail.com"}/>
          </a>
        </p>
        <p onClick={changeTheme} className="ml-10"><AnimatedButton text={"change colors"}/></p>
      </div>
      <div className="flex">
        <p className="mr-10"><AnimatedButton text={"meowseum"} href={"/"}/></p>
        <p className="mr-10"><a href="/about"><AnimatedButton text={"about"}  href={"/about"}/></a></p>
        <p><AnimatedButton text={"submit photo"}/></p>
      </div>
    </div>
  );
}
