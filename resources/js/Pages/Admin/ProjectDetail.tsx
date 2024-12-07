// edit and add new projects
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import React, { useState, useEffect } from "react";
import { router } from '@inertiajs/react';
import { usePage } from "@inertiajs/react";
import RadioInput from "@/Components/RadioInput";
import DragAndDrop from "@/Components/DragandDrop";
import BackIcon from "@/src/icons/back";


export default function projectDetail({ project, cols }) {
    const projectFields = typeof cols == "object" ? Object.values(cols) : cols;

    // https://inertiajs.com/validation#displaying-errors
    const { errors } = usePage().props;

    const [projectvalues, setprojectValues] = useState({});
    //click on edit button will get the specific project record and maps those data in projectvalues
    //clicking on edit mode also sets id value which will eventually update the record.
    //check console
    useEffect(() => {
        if (project) {
            for (const i in project) {
                setprojectValues((projectvalues) => ({
                    ...projectvalues,
                    [i]: project[i],
                }));
            }
        } else {
            // set state to on as a default
            setprojectValues((projectvalues) => ({
                ...projectvalues,
                ["state"]: "on",
            }));
        }
    }, []);

    // https://inertiajs.com/forms
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setprojectValues((projectvalues) => ({
            ...projectvalues,
            [key]: value,
        }));
    }

    function handleFile(key, value, singleFile = false) {
        if (singleFile === true) {
            value = value[0];
        }
        setprojectValues((projectvalues) => ({
            ...projectvalues,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post(route("admin.project-save"), projectvalues);
    }

    console.log(projectvalues);

    return (
        <AdminLayout title={project ? project.title : "Add new project"} activeTitle={'projects'}>
            <div className="rounded-md md:px-5">
            <Button mode={"transparent"} handleClick={() => history.back()}>
                <BackIcon /> Go Back
            </Button>
            <div className="flex flex-col items-center justify-center">
                <div className="lg:w-1/2 md:w-2/3 w-full">
                    <form method="post" onSubmit={handleSubmit}>
                        {projectFields
                            .filter(
                                (f) =>
                                    ![
                                        "thumbnail",
                                        "images",
                                        "description",
                                        "state",
                                    ].includes(f)
                            )
                            .map((field, index) => (
                                <TextInput
                                    key={index}
                                    field={field}
                                    handleChange={handleChange}
                                    fieldValue={projectvalues[field]}
                                    error={errors.field && errors.field} //pass errors.title if exists
                                />
                            ))}

                        {/* thumbnail upload  */}
                        <DragAndDrop
                            field="thumbnail"
                            inputName={"thumbnail"}
                            fileLimit={1}
                            handleFile={handleFile}
                            error={errors.thumbnail}
                        />
                        {/* images upload  */}
                        <DragAndDrop
                            field="images"
                            inputName={"images"}
                            fileLimit={6}
                            handleFile={handleFile}
                        />
                        <Textarea
                            field={"description"}
                            handleChange={handleChange}
                            fieldValue={projectvalues.description}
                            placeholder={"Write the project description"}
                            error={errors.description && errors.description}
                        />

                        <RadioInput
                            field={"state"}
                            radios={[
                                {
                                    label: "on",
                                    value: "on",
                                    checkValue: projectvalues.state,
                                    handleChange: handleChange,
                                },
                                {
                                    label: "off",
                                    value: "off",
                                    checkValue: projectvalues.state,
                                    handleChange: handleChange,
                                },
                            ]}
                        />

                        <Button className="mt-5">
                            {project ? "Update" : "Add New"}
                        </Button>
                    </form>
                </div>
            </div>
            </div>
        </AdminLayout>
    );
}
