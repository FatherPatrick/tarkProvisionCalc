import React, { ChangeEventHandler } from "react";

interface InputProps {
    type: string,
    name: string,
    defaultValue: string,
    handleChange: (event: { target: { name: any; value: any; }; }) => void
}

export const StyledInput: React.FC<InputProps> = ({type, name, defaultValue, handleChange}) => {
    return (
        <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        style={{
            backgroundColor: "white",
            color: "black",
            padding: "5px 15px",
            borderRadius: "5px",
            boxShadow: "0px 2px 2px lightgray",
            fontFamily: "monospace"
        }}
        />
    )
}