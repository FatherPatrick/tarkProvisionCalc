import React from "react";

interface ButtonProps {
    text: string,
}

export const StyledButton: React.FC<ButtonProps> = ({text}) => {
    return (
        <button type="submit" 
        style={{
            backgroundColor: "#3f51b5",
            color: "white", 
            padding: "5px 15px", 
            borderRadius: "5px",
            outline: "0",
            border: "0",
            margin: "10px 0px",
            cursor: "pointer",
            boxShadow: "0px 2px 2px lightgray",
            transition: "ease background-color 250ms",
            fontFamily: "monospace"
        }}>
            {text}
        </button>
    )
}