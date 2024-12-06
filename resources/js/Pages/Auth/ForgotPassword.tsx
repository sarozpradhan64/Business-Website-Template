import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Guest>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                Forgot your password? Enter your email address from which you previously logged in.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    field={"email"}
                    value={data.email}
                    handleChange={onHandleChange}
                    error={errors.email}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing} rounded>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
