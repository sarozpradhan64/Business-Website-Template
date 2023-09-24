import React from "react";

export default function Checkbox({ name, value, id, label, handleChange }) {
    return (
        <div className="flex my-1 items-center mx-1">
            <input
                type="checkbox"
                name={name}
                id={id}
                className="text-purple-600 bg-primary rounded border-gray-500 focus:ring-purple-500  focus:ring-1"
                value ={value}
                onChange={handleChange}
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-primary">
                {label}
            </label>
        </div>
    );
}
