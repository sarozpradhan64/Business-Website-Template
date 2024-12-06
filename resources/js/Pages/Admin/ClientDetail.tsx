// edit and add newclients
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import RadioInput from "@/Components/RadioInput";
import DragAndDrop from "@/Components/DragandDrop";
import BackIcon from "@/src/icons/back";


export default function clientDetail({client, cols }) {
    const clientFields = typeof cols == "object" ? Object.values(cols) : cols;

    // https://inertiajs.com/validation#displaying-errors
    const { errors } = usePage().props;

    const [clientvalues, setclientValues] = useState({});
    //click on edit button will get the specificclient record and maps those data in clientvalues
    //clicking on edit mode also sets id value which will eventually update the record.
    //check console
    useEffect(() => {
        if (client) {
            for (const i in client) {
                setclientValues((clientvalues) => ({
                    ...clientvalues,
                    [i]:client[i],
                }));
            }
        } else {
            // set state to on as a default
            setclientValues((clientvalues) => ({
                ...clientvalues,
                ["state"]: "on",
            }));
        }
    }, []);

    // https://inertiajs.com/forms
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setclientValues((clientvalues) => ({
            ...clientvalues,
            [key]: value,
        }));
    }

    function handleFile(key, value, singleFile = false) {
        if (singleFile === true) {
            value = value[0];
        }
        setclientValues((clientvalues) => ({
            ...clientvalues,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("admin.clientSave"), clientvalues);
    }

    console.log(clientvalues);

    return (
        <AdminLayout title={client ? client.title : "Add new client"} activeTitle={'clients'}>
             <div className="rounded-md md:px-5     ">
            <Button mode={"transparent"} handleClick={() => history.back()}>
                <BackIcon /> Go Back
            </Button>
            <div className="flex flex-col items-center justify-center">
                <div className="lg:w-1/2 md:w-2/3 w-full">
                    <form method="post" onSubmit={handleSubmit} className="w-full">
                        {clientFields
                            .filter(
                                (f) =>
                                    ![
                                        "logo",
                                        "state",
                                    ].includes(f)
                            )
                            .map((field, index) => (
                                <TextInput
                                    key={index}
                                    field={field}
                                    handleChange={handleChange}
                                    fieldValue={clientvalues[field]}
                                    error={errors.field && errors.field} //pass errors.title if exists
                                />
                            ))}

                        {/* logo upload  */}
                        <DragAndDrop
                            field="logo"
                            inputName={"logo"}
                            fileLimit={1}
                            handleFile={handleFile}
                            error={errors.logo}
                        />
                   
                        <RadioInput
                            field={"state"}
                            radios={[
                                {
                                    label: "on",
                                    value: "on",
                                    checkValue: clientvalues.state,
                                    handleChange: handleChange,
                                },
                                {
                                    label: "off",
                                    value: "off",
                                    checkValue: clientvalues.state,
                                    handleChange: handleChange,
                                },
                            ]}
                        />

                        <Button className="mt-5">
                            {client ? "Update" : "Add New"}
                        </Button>
                    </form>
                </div>
            </div>
            </div>
        </AdminLayout>
    );
}
