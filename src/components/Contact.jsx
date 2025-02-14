import React, { useState, useEffect } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import CursorContact from "../utils/CursorContact";

export default function Contact() {

    const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setShowCursor(true);
    return () => setShowCursor(false);
  }, []);

  return (
    <div className="uppercase leading-64">
         {showCursor && <CursorContact />}
      <div className="flex">
        <h1 className="font-mango-black text-10xl mt-28">the world's</h1>
        <img
          src="/cat-contact.png"
          alt="one cat"
          className="absolute left-3/8 top-20"
        />
      </div>
      <h1 className="font-mango-italic text-10xl">biggest</h1>
      <h1 className="font-mango-black flex justify-end text-10xl">
        <span className="font-mango-iblack mr-10">cat</span> gallery
      </h1>
      <h1 className="font-mango-black text-10xl">
        a <span className="font-mango-italic">wonderland </span>for
      </h1>
      <div className="flex text-10xl">
        <div>
          <h1 className="font-mango-black">
            <span className="font-mango-iblack">cat </span>lovers
          </h1>
          <div className="flex justify-between font-switzer-semibold text-lg -mt-12">
            <p>
              <AnimatedButton text={"submit photo"} />
            </p>
            <p>
              <AnimatedButton text={"meowseumofficial@gmail.com"} />
            </p>
          </div>
        </div>

        <img
          src="/cat-contact-2.png"
          alt="a sticker with a cat at spa"
          className="absolute left-3/7 -mt-28 ml-10"
        />
      </div>
      <div className="leading-none">
        <div className="mt-96 flex flex-col justify-center">
          <h1 className="font-dirtyline text-11xl">meowseum</h1>
          <img
            src="/sticker-cat.png"
            alt="a sticker with a cute cat"
            className="w-3xl flex left-1/2 translate-x-2/3"
          />
        </div>
        <div className="flex text-sm justify-between font-switzer-semibold">
            <p>©ALL RIGHTS RESERVED</p>
            <p>BY RAUL & ELIZA. 2025</p>
          </div>
      </div>
    </div>
  );
}
