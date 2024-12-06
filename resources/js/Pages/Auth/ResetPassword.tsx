import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.update"));
    };

    return (
        <Guest>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        field={"email"}
                        value={data.email}
                        error={errors.email}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                <TextInput
                        field={"password"}
                        type={"password"}
                        value={data.password}
                        error={errors.password}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
               
                <TextInput
                        type="password"
                        field={"confirm password"}
                        name="password_confirmation"
                        placeholder={"Enter your password again"}
                        value={data.password_confirmation}
                        handleChange={onHandleChange}
                        error={errors.password_confirmation}
                    />
                
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing} rounded={true}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
