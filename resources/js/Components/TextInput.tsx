import React, { useEffect } from "react";

export default function TextInput({
    field,
    className = "",
    type = "text",
    placeholder,
    name,
    textColor,
    handleChange,
    fieldValue,
    required = false,
    isFocused,
    error,
    readOnly = false,
    disabled = false,
}) {
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="mb-5">
            {" "}
            <label
                htmlFor={field}
                className={`block mb-2 text-md font-medium ${
                    textColor ? textColor : " text-primary "
                }`}
            >
                {field.toUpperCase()}
            </label>
            <input
                type={type}
                id={field}
                className={`${
                    textColor ? textColor : " text-primary " 
                } text-gray-900 text-md rounded-lg  block w-full p-3
                        ${
                            readOnly === true
                                ? " border-none bg-transparent focus:ring-transparent"
                                : " border-gray-400 bg-primary focus:ring-purple-500 focus:border-transparent"
                        } ${" " + className}`}
                placeholder={placeholder ? placeholder : "Enter " + field}
                // passing value from state
                name={name ? name : field}
                value={fieldValue}
                onChange={handleChange}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
                autoComplete={false}
            />
            <p className="text-red-700 mt-1">{error}</p>
        </div>
    );
}
