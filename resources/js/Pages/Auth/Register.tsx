import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <Guest>
            <Head title="Register" />

            <form onSubmit={submit}>
                <TextInput
                    field={"name"}
                    value={data.name}
                    error={errors.name}
                    handleChange={onHandleChange}
                />

                <div className="mt-4">
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
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Already registered?
                    </Link>

                    <Button className="ml-4" processing={processing} rounded>
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
