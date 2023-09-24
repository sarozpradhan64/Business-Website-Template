import { Link } from "@inertiajs/inertia-react";
import React from "react";
import Button from "@/Components/Button";
import dateFormat from "dateformat";
export default function EditRemove({
    viewData = [],
    isView = false,
    isEdit = true,
    isRemove = true,
    removeTitle,
    removeRoute,
    reloadProps = [],
    editRoute,
    editData,
    postData,
}) {
    // console.log(viewData);
    const [showModal, setShowModal] = React.useState(false); //for remove modal
    const [viewModal, setViewModal] = React.useState(false); //for data view modal

    const handleOutSideClick = function (e) {
        if (e.target.getAttribute("data-name") === "modal-container") {
            setViewModal(false);
            setShowModal(false);
        }
    };
    //for view modal
    // content store react element of  key and value.
    const content = [];
    // viewData[0] because viewData is type array
    // if (viewData.length > 0 && viewData[0].length > 0) {
    for (const i in viewData[0]) {
        // console.log(i);
        // console.log(viewData[0][i]);
        const key = i;
        const value = viewData[0][i];
        let formattedValue;
        switch (key) {
            case "created_at":
            case "updated_at":
                formattedValue = dateFormat(value, "fullDate");
                break;
            case "logo":
            case "thumbnail":
                formattedValue = (
                    <>
                        {value}
                        <img
                            className="inline-block w-20 h-20 object-cover mr-1 rounded-sm"
                            src={value}
                            height={80}
                            width={80}
                        />
                    </>
                );
                break;
            case "images":
                formattedValue = (
                    <>
                        {value}{" "}
                        {value &&
                            value
                                .split(", ")
                                .map((image) => (
                                    <img
                                        className="inline-block w-20 h-20 object-cover mt-1 mr-1 rounded-sm"
                                        src={image}
                                    />
                                ))}
                    </>
                );
                break;
            default:
                formattedValue = value;
        }

        content.push(
            <div className="text-primary text-sm py-3">
                <span className="inline-block w-24">
                    {key.replace(/_/g, " ").toUpperCase()}
                </span>{" "}
                <span>: {formattedValue}</span>
            </div>
        );
    }
    // }

    return (
        <>
            <div className="flex">
                {isView == true && (
                    <div
                        className="select-none cursor-pointer text-white bg-green-600 px-2 py-1 rounded-full font-bold"
                        onClick={() => setViewModal(true)}
                    >
                        View
                    </div>
                )}

                {isEdit == true && (
                    <div className="select-none cursor-pointer bg-blue-600 text-white px-2 py-1 rounded-full ml-2 font-bold">
                        {" "}
                        <Link href={editRoute} data={editData} method="post">
                            Edit
                        </Link>
                    </div>
                )}

                {isRemove == true && (
                    <div
                        className="cursor-pointer bg-red-600 text-white px-2 py-1 rounded-full  font-bold ml-2 select-none"
                        onClick={() => setShowModal(true)}
                    >
                        {" "}
                        Remove
                    </div>
                )}
            </div>
            {/* view modal  */}
            {viewModal && (
                <>
                    <div
                        data-name="modal-container"
                        className=" bg-primary/50 backdrop-blur-xs justify-center  flex items-start overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={handleOutSideClick}
                    >
                        <div className="relative z-100 my-6 mx-auto max-w-3xl  w-3/4 modal-content">
                            {/*content*/}
                            <div className="py-5 rounded-md shadow-lg text-red-600 relative w-full  bg-secondary outline-none focus:outline-none">
                                {/*header*/}
                                <div className="mb-5">
                                    <h3 className="text-3xl font-semibold text-center">
                                        Data View
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className=" p-4 flex-auto">
                                    <p className="px-2 text-slate-500 text-lg leading-relaxed grid md:grid-cols-2 gap-3">
                                        {content}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end px-5 rounded-b ">
                                    {/* implementing partial reload of interita js */}

                                    <Button
                                        mode="danger"
                                        className=" font-bold uppercase"
                                        type="button"
                                        handleClick={() => setViewModal(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* remove modal  */}
            {showModal && (
                <>
                    <div
                        data-name="modal-container"
                        className="bg-primary/50 backdrop-blur-xs justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={handleOutSideClick}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-md shadow-lg text-red-600 relative w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center">
                                        Are you sure?
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-4 flex-auto">
                                    <p className="px-2 text-slate-500 text-lg leading-relaxed text-center">
                                        Deleting {removeTitle} !!
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                    {/* implementing partial reload of interita js */}
                                    <Link
                                        href={removeRoute}
                                        only={reloadProps}
                                        preserveScroll
                                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Delete !
                                    </Link>
                                    <button
                                        className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    );
}
