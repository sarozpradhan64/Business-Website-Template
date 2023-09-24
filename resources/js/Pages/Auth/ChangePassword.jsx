import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import BackIcon from "@/src/icons/back";

export default function ChangePassword({ status, wrong, canResetPassword }) {

    const {auth} = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        old_email: "",
        new_password: "",
        confirm_remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    useEffect(()=>{
        setData('email',auth.user.email );
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("password.change"));
    };

    console.log(data)

    return (
        <Guest>
            <Head title="Change Password" />
            <Button mode={"transparent"} handleClick={() => history.back()}>
                <BackIcon /> Go Back
            </Button>
            <h1 className="text-primary font-bold text-2xl text-center mb-4">
                 ADMIN
            </h1>
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status} <br />
                </div>
            )}
            {wrong && (
                <p className="mb-4 font-medium text-sm text-red-600">{wrong}</p>
            )}

            <form onSubmit={submit}>
            <div className="mt-4">
                    <TextInput
                        field={"email".replace(/_/g, " ")}
                        // name = field
                        name={"email"}
                        type={"email"}
                        fieldValue={data.email}
                        error={errors.email}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mt-4">
                    <TextInput
                        field={"old_password".replace(/_/g, " ")}
                        // name = field
                        name={"old_password"}
                        type={"password"}
                        fieldValue={data.old_password}
                        error={errors.old_password}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mt-4">
                    <TextInput
                        field={"new_password".replace(/_/g, " ")}
                        name={"new_password"}
                        type={"password"}
                        fieldValue={data.new_password}
                        error={errors.new_password}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mt-4">
                    <TextInput
                        field={"confirm_password".replace(/_/g, " ")}
                        name="confirm_password"
                        type={"password"}
                        placeholder={"Confirm new Password"}
                        value={data.confirm_password}
                        error={errors.confirm_password}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-500 hover:text-primary"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button
                        className="ml-4"
                        processing={processing}
                        rounded={true}
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
