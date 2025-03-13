import React from "react";
import Menu from "../components/Menu";
import CursorContact from "../utils/CursorContact";
import Cursor from "../utils/Cursor";

export default function Page404() {
    return (
        <div className="size-container-ideal leading-none justify-center items-center flex flex-col overflow-hidden">
            <Menu />
            <CursorContact />
            <Cursor />
            <div className="flex justify-center items-center font-dirtyline desktop:text-13xl tablet:text-10xl mobile:text-[3rem] mt-[20vh] leading-none gap-2">
                <h1>4</h1>
                <div className="flex justify-center items-center">
                    <img 
                        src="/sticker-cat.png" 
                        alt="a sticker with a cute cat" 
                        className="w-32 tablet:w-2xl -mt-12" 
                    />
                </div>
                <h1>4</h1>
            </div>
            <p className="font-general-regular uppercase leading-none desktop:-mt-[10vh] text-center px-4">
                Oops! Looks like you got lost in the catnip!
            </p>
        </div>
    );
}
