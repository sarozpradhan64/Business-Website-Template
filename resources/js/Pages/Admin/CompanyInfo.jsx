import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { Inertia } from "@inertiajs/inertia";
import DragAndDrop from "@/Components/DragandDrop";
import { usePage } from "@inertiajs/inertia-react";
import Textarea from "@/Components/Textarea";
import Error from "@/Components/Error";

export default function CompanyInfo({ info, cols, errormsg }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const infoFields = typeof cols == "object" ? Object.values(cols) : cols;

    const [infovalues, setinfoValues] = useState({});

    // read only will handle if user want to edit or not
    const [isReadOnly, setIsReadOnly] = useState(true);

    const handleEditMode = function () {
        setIsReadOnly(!isReadOnly);
    };

    // retrive existing data from and set to form values
    useEffect(() => {
        if (info) {
            for (const i in info) {
                if (i !== "company_logo") {
                    setinfoValues((infovalues) => ({
                        ...infovalues,
                        [i]: info[i],
                    }));
                }
            }
        }
    }, []);

    // https://inertiajs.com/forms
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setinfoValues((infovalues) => ({
            ...infovalues,
            [key]: value,
        }));
    }

    function handleFile(key, value, singleFile = false) {
        if (singleFile === true) {
            value = value[0];
        }
        setinfoValues((infovalues) => ({
            ...infovalues,
            [key]: value,
        }));
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        Inertia.post(route("admin.infoSave"), infovalues, {
            onSuccess: () => setIsReadOnly(!isReadOnly),
        });
    };

    console.log(infovalues);

    return (
        <AdminLayout title={"Company Info"} activeTitle={"Company info"}>
            {errormsg && <Error message={errormsg} />}
            <div className="md:px-5 mt-3">
                <Button
                    mode={isReadOnly ? "blue" : "danger"}
                    handleClick={handleEditMode}
                >
                    {isReadOnly ? "Edit" : "Cancel"}
                </Button>

                <form
                    method="post"
                    onSubmit={handleSubmit}
                    handleFile={handleFile}
                    className="mt-5"
                >
                    {/* display logo else drag and drop for edit  */}
                    {isReadOnly && infoFields.includes("company_logo") && (
                        <>
                            <span className="block mb-2 text-sm font-medium text-primary">
                                COMPANY LOGO
                            </span>
                            {/* <a
                                href={
                                    info &&
                                    info.company_logo ?
                                    info.company_logo : '/images/company_logo.png'
                                }
                                target="_blank"
                            > */}
                            <img
                                className="mb-5 h-28 w-28 rounded-full object-cover"
                                src={
                                    info && info.company_logo
                                        ? info.company_logo
                                        : "/images/company_logo.png"
                                }
                            />{" "}
                            {/* </a> */}
                        </>
                    )}
                    {!isReadOnly && infoFields.includes("company_logo") && (
                        <div className="grid md:grid-cols-2 gap-2">
                            <DragAndDrop
                                field={"company logo"}
                                fileLimit={1}
                                handleFile={handleFile}
                                inputName={"company_logo"}
                                error={errors.company_logo}
                            />
                        </div>
                    )}

                    <div className=" grid md:grid-cols-2 gap-2">
                        {/* ignore company_logo from field list  */}
                        {infoFields
                            .filter((f) => f !== "company_logo")
                            .map((field, index) => {
                                if (
                                    field === "about_us" ||
                                    field === "company_slogan"
                                ) {
                                    return (
                                        <div className="">
                                            <Textarea
                                                field={field.replace(/_/g, " ")}
                                                name={field}
                                                fieldValue={infovalues[field]}
                                                handleChange={handleChange}
                                                readOnly={isReadOnly}
                                                error={errors[field]}
                                                placeholder={
                                                    isReadOnly &&
                                                    field.replace(/_/g, " ")
                                                }
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="">
                                            <TextInput
                                                field={field.replace(/_/g, " ")}
                                                name={field}
                                                type={
                                                    field === "established_date"
                                                        ? "date"
                                                        : field === "email"
                                                        ? "email"
                                                        : "text"
                                                }
                                                fieldValue={infovalues[field]}
                                                handleChange={handleChange}
                                                readOnly={isReadOnly}
                                                error={errors[field]}
                                                placeholder={
                                                    isReadOnly &&
                                                    field.replace(/_/g, " ")
                                                }
                                            />
                                        </div>
                                    );
                                }
                            })}
                    </div>
                    {!isReadOnly && <Button>{info ? "Update" : "Save"}</Button>}
                </form>
            </div>
        </AdminLayout>
    );
}
