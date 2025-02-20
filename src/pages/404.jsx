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
            <div className="flex justify-center items-center font-dirtyline text-13xl mt-[20vh] leading-none">
                <h1>4</h1>
                <img src="/sticker-cat.png" alt="a sticker with a cute cat" className="w-2xl -mt-24"/>
                <h1>4</h1>
            </div>
            <p className="font-general-regular uppercase leading-none -mt-[15vh]">Oops! Looks like you got lost in the catnip!</p>
        </div>
    );
}