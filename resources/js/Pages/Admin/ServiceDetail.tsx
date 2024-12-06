// edit and add new services
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import RadioInput from "@/Components/RadioInput";
import BackIcon from "@/src/icons/back";

export default function ServiceDetail({ service, cols }) {
    const serviceFields = typeof cols == "object" ? Object.values(cols) : cols;
    const [iconHelp, setIconHelp] = useState(false);
    // https://inertiajs.com/validation#displaying-errors
    const { errors } = usePage().props;

    const [values, setValues] = useState({});
    //click on edit button will get the specific service record and maps those data in values
    //clicking on edit mode also sets id value which will eventually update the record.
    //check console
    useEffect(() => {
        if (service) {
            for (const i in service) {
                setValues((values) => ({ ...values, [i]: service[i] }));
            }
        } else {
            // set state to on as a default
            setValues((values) => ({ ...values, ["state"]: "on" }));
        }
    }, []);

    console.log(serviceFields);
    console.log(values);

    // https://inertiajs.com/forms

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({ ...values, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("admin.serviceSave"), values);
    }

    const handleIconHelp = () => setIconHelp(!iconHelp);
    return (
        <AdminLayout
            title={service ? service.title : "Add new Service"}
            activeTitle={"services"}
        >
            <div className="rounded-md md:px-5">
                <Button mode={"transparent"} handleClick={() => history.back()}>
                    <BackIcon /> Go Back
                </Button>
                <div className="flex flex-col items-center justify-center">
                    <div className="lg:w-1/2 md:w-2/3 w-full">
                        <form method="post" onSubmit={handleSubmit}>
                            {serviceFields
                                .filter(
                                    // discards descriptioon and state
                                    (f) => !["description", "state"].includes(f)
                                )
                                .map((field, index) => (
                                    <div className="relative">
                                        <TextInput
                                            field={field}
                                            handleChange={handleChange}
                                            fieldValue={values[field]}
                                            placeholder={
                                                field === "icon" &&
                                                `Enter icon Ex: <i class="fa-brands fa-facebook-f"></i>"`
                                            }
                                            error={errors[field] && errors[field]} //pass errors.title if exists
                                        />
                                        {field === "icon" && (
                                            <>
                                                <div
                                                    className="absolute right-0 top-0 text-red-700 select-none cursor-pointer"
                                                    onClick={handleIconHelp}
                                                >
                                                    Help?
                                                </div>
                                                {iconHelp && (
                                                    <div className="mb-5 text-red-700">
                                                        Goto{" "}
                                                        <a
                                                            href="https://fontawesome.com"
                                                            target={"_blank"}
                                                            rel="noreferrer"
                                                            className="text-blue-700"
                                                        >
                                                            fontawesome.com
                                                        </a>{" "}
                                                        ,search icon V6 and
                                                        copy/paste the html
                                                        element. Example: "
                                                        {`<i class="fa-brands fa-facebook-f"></i>
                                                        `}
                                                        "
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}

                            <Textarea
                                field={"description"}
                                handleChange={handleChange}
                                fieldValue={values.description}
                                error={errors.description && errors.description}
                            />

                            <RadioInput
                                field={"state"}
                                radios={[
                                    {
                                        label: "on",
                                        value: "on",
                                        checkValue: values.state,
                                        handleChange: handleChange,
                                    },
                                    {
                                        label: "off",
                                        value: "off",
                                        checkValue: values.state,
                                        handleChange: handleChange,
                                    },
                                ]}
                            />

                            <Button className="mt-5">
                                {service ? "Update" : "Add New"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
