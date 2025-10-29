import React from "react";
import jei from "@assets/logos/jei.png";

const Jei: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
        <img
            src={jei}
            alt="JEI Logo"
            width={150}      // ancho por defecto
            height={50}      // alto por defecto
            style={{ objectFit: "contain" }}
            {...props}       // permite sobrescribir width/height con props
        />
    );
};

export default Jei;
