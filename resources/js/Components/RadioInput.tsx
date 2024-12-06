import React from "react";

export default function RadioInput({ field, radios, className }) {
    // const radios = [{lable: 'male', value: 'male', checkValue: 'somevalue', handleChange: 'somefunction'}]
    return (
        <div className="my-5">
            {" "}
            <label
                className={
                    "block mb-2 text-md font-medium text-primary" + className
                }
            >
                {field.toUpperCase()}
            </label>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-secondary rounded-lg  border border-gray-400">
                {radios.map((radio, index) => (
                    <li
                        key={index}
                        className={`w-full rounded-t-lg   ${
                            index < radios.length - 1 &&
                            " border-b border-gray-400 "
                        }`}
                    >
                        <div className="flex items-center pl-3">
                            <input
                                id={radio.label}
                                type="radio"
                                value={radio.value}
                                name={field}
                                onChange={radio.handleChange}
                                checked={
                                    radio.checkValue == radio.value && true
                                }
                                className="w-4 h-4 bg-secondary text-blue-600 bg-gray-100 border-primary focus:ring-blue-500"
                            />
                            <label
                                htmlFor={radio.label}
                                className="py-3 ml-2  w-full text-sm font-medium text-primary"
                            >
                                {radio.label.toUpperCase()}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
