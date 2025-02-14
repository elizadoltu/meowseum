import React from "react";
import Menu from "../components/Menu";
import Contact from "../components/Contact";

export default function Main() {
    return(
        <div className="size-container-ideal">
            <Menu />
            <Contact />
        </div>
    );
}