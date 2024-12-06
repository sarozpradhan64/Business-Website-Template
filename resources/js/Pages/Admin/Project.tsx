import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Button";
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import Table from "@/Components/Table";
import EditRemove from "@/utils/ViewEditRemove";

export default function Project({ projects, cols }) {
    // if object convert to array,
    // cols contain table column list from mysql and adding extra column "actions"
    const fields = typeof cols == "object" ? Object.values(cols) : cols;
    // filtering to include  these columns for table columns
    const columnFields = ["s.n"];
    // append S.N column to the front
    //www.freecodecamp.org/news/javascript-append-to-array-a-js-guide-to-the-push-method-2/#how-to-add-the-contents-of-one-array-to-the-end-of-another
    columnFields.push(
        ...fields.filter((f) => ["title", "url", "state"].includes(f))
    );
    // push action column to the end
    columnFields.push("actions");
    // optimizing the column with react component <EditRemove/> in action column for edit and remove elements
    //feature of reacttables
    const optimizedColumns = columnFields.map((col) => {
        if (col === "s.n") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => prop.row.index+1,
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
                        removeRoute={
                            "/admin/project?remove=true&projectId=" +
                            prop.row.original.id
                        }
                        reloadProps={["projects"]}
                        removeTitle={prop.row.original.title}
                        // https://inertiajs.com/links#data
                        editRoute={route("admin.projectDetail")}
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
    const data = React.useMemo(() => projects, []);

    //tablecolumn
    const columns = React.useMemo(() => optimizedColumns, []);

    return (
        <AdminLayout title={"Projects"} activeTitle={"Projects"}>
            <Link href={route("admin.projectDetail")}>
                {" "}
                <Button className="mb-4" mode="blue">
                    Add New
                </Button>{" "}
            </Link>
            <Table data={data} columns={columns} />
        </AdminLayout>
    );
}
