import React from "react";

export default function Textarea({
    field,
    placeholder,
    handleChange,
    fieldValue,
    className,
    required = false,
    readOnly = false,
    error,
    name,
    textColor,
}) {
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
            <textarea
                id={field}
                className={`bg-primary ${
                    textColor ? textColor : " text-primary "
                } h-24  block p-2.5 w-full text-md text-gray-900 rounded-lg
                ${
                    readOnly === true
                        ? " border-none bg-secondary focus:ring-transparent"
                        : "border border-gray-400 bg-primary focus:ring-purple-500 focus:border-transparent"
                }
                 ${className}`}
                placeholder={
                    placeholder ? placeholder : "Write the " + field + "..."
                }
                name={name ? name : field}
                value={fieldValue}
                onChange={handleChange}
                required={required}
                readOnly={readOnly}
            ></textarea>
            <p className="text-red-700 mt-1">{error}</p>
        </div>
    );
}
