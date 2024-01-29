import React from "react";

interface LabelProps {
    text: string,
}

export const StyledLabel: React.FC<LabelProps> = ({text}) => {
    return (
        <label
        style={{
            backgroundColor: "#3f51b5",
            color: "white",
            padding: "5px 15px",
            borderRadius: "5px",
            boxShadow: "0px 2px 2px lightgray",
            fontFamily: "monospace"
        }}>
            {text}
        </label>
    )
}