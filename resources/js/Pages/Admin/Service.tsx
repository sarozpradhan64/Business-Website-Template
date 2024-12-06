import AdminLayout from "@/Layouts/AdminLayout";
import CapitalizeFirstLetter from "../../utils/CapitalizeFirstLetter";
import React from "react";
import { useTable, useSortBy } from "react-table";
import RenderMyHtml from "@/utils/RenderMyHtml";
import EditRemove from "../../utils/ViewEditRemove";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";
import Table from "@/Components/Table";

export default function Service({ services, cols }) {
    console.log(services);
    // if object convert to array,
    // cols contain table column list from mysql and adding extra column "actions"
    const fields = typeof cols == "object" ? Object.values(cols) : cols;
    const columnFields = ["s.n"];
    columnFields.push(
        ...fields.filter((f) => ["title", "icon", "state"].includes(f))
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
        } else if (col === "icon") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => (
                    <div className="text-md">{RenderMyHtml(prop.row.original.icon)}</div>
                ),
            };
        } else if (col == "actions") {
            return {
                Header: CapitalizeFirstLetter(col),
                accessor: col,
                Cell: (prop) => (
                    <EditRemove
                        isView={true}
                        viewData={data.filter(
                            (d) => prop.row.original.id === d.id
                        )}
                        removeRoute={
                            "/admin/service?remove=true&serviceId=" +
                            prop.row.original.id
                        }
                        reloadProps={["services"]}
                        removeTitle={prop.row.original.title}
                        // https://inertiajs.com/links#data
                        editRoute={route("admin.serviceDetail")}
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
    const data = React.useMemo(() => services, []);

    //tablecolumn
    const columns = React.useMemo(() => optimizedColumns, []);

    return (
        // title is for title in tab and activeTitle is for active link in sidebar
        <AdminLayout title={"Services"} activeTitle={"Services"}>
            <Link href={route("admin.serviceDetail")}>
                {" "}
                <Button className="mb-4" mode="blue">
                    Add New
                </Button>{" "}
            </Link>
            <Table data={data} columns={columns} />
        </AdminLayout>
    );
}
