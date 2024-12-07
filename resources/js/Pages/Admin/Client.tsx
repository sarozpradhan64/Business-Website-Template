import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Button";
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import Table from "@/Components/Table";
import EditRemove from "@/utils/ViewEditRemove";

export default function Client({ clients, cols }) {
    // if object convert to array,
    // cols contain table column list from mysql and adding extra column "actions"
    const fields = typeof cols == "object" ? Object.values(cols) : cols;
    // filtering to include  these columns for table columns
    const columnFields = ["s.n"];
    columnFields.push(
        ...fields.filter((f) => ["title", "logo", "url", "state"].includes(f))
    );
    columnFields.push("actions");

    // optimizing the column with react component <EditRemove/> in action column for edit and remove elements
    //feature of reacttables
    const optimizedColumns = columnFields.map((col) => {
        if (col === "s.n") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => prop.row.index + 1,
            };
        } else if (col === "logo") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => (
                    //display image for logo
                    <a
                        href={prop.row.original.logo}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        <img
                            src={prop.row.original.logo}
                            className="w-8 h-8 rounded-full"
                        />
                    </a>
                ),
            };
        } else if (col == "actions") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => (
                    <EditRemove
                        isView={true}
                        // this row will be display in view modal, prop.row.original.id is react-table
                        //prop that returns current row id
                        //data.filter returns array
                        viewData={data.filter(
                            (d) => prop.row.original.id === d.id
                        )}
                        //remove this id record and reload only table content
                        removeRoute={
                            "/admin/client?remove=true&clientId=" +
                            prop.row.original.id
                        }
                        reloadProps={["clients"]}
                        removeTitle={prop.row.original.title}
                        // https://inertiajs.com/links#data
                        editRoute={route("admin.client-show")}
                        editData={{ id: prop.row.original.id }}
                    />
                ),
            };
            // prop.row.original.id returns the id value of "id data" in same row. id is disabled due to col list
        } else {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
            };
        }
    });

    //tabledata
    const data = React.useMemo(() => clients, []);

    //tablecolumn
    const columns = React.useMemo(() => optimizedColumns, []);

    return (
        <AdminLayout title={"Clients"} activeTitle={"Clients"}>
            <Link href={route("admin.client-show")}>
                {" "}
                <Button className="mb-4" mode="blue">
                    Add New
                </Button>{" "}
            </Link>
            <Table data={data} columns={columns} />
        </AdminLayout>
    );
}
