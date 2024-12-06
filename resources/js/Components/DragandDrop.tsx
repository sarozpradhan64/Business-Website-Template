import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DragAndDrop({
    field,
    inputName,
    fileLimit,
    handleFile,
    fieldValue,
    error
}) {
    const [files, setFiles] = useState([]);
    const defaultFileLimit = 4;
    const onDrop = useCallback((acceptedFiles) => {
        // console.log(acceptedFiles);
        const allFiles = [...files, ...acceptedFiles];
        setFiles(allFiles);

        // apply filehanldle change function here 
        // function handleFile(key, value, singleFile = false)
        // if fileLimit is 1 then set singleFile to true 
        handleFile(field, acceptedFiles, fileLimit == 1 && true);

    }, []);

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            accept: { "image/png": [], "image/jpeg": [] },
            maxFiles: fileLimit ? fileLimit : defaultFileLimit,
        });
    // errors
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <span key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <span key={e.code} className="text-red-700">
                        {e.message}
                    </span>
                ))}
            </ul>
        </span>
    ));

    return (
        <div className="mb-5">
            <label className={"block mb-2 text-md font-medium text-primary"}>
                {field.toUpperCase()}
            </label>
            <div
                {...getRootProps()}
                className="bg-primary min-h-28 items-center w-full rounded-md"
            >
                <input
                    {...getInputProps({
                        name: inputName ? inputName : field.toLowerCase(),
                    })}
                />
                <label class="flex flex-col justify-center items-center w-full bg-primary rounded-md  border border-gray-400 border-dashed cursor-pointer">
                    <div class="flex flex-col justify-center items-center pt-3 pb-3">
                        <svg
                            aria-hidden="true"
                            class="mb-3 w-7 h-7 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-600">
                            {isDragActive
                                ? "Drop the files here ..."
                                : `Drag and drop, or click to
                                select files`}
                        </p>
                        <p class="text-xs text-gray-600">PNG, JPG</p>
                    </div>
                    {files.length > 0 && (
                        <div className="flex text-gray-400">
                            Files :
                            {files.map((file, index) => (
                                <span key={index}>
                                    {`${file.path + "-" + file.size+ " bytes"}${
                                        files.length > 1 &&
                                        index !== files.length - 1
                                            ? ", "
                                            : ""
                                    }`}{" "}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* errors  */}
                    <div>{fileRejectionItems}</div>  {/*error from dropzone */}
                
                </label>
            </div>
            <p className="text-red-700 mt-1">{error}</p>  {/*error from laravel */}
        </div>
    );
}
