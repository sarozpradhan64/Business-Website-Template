import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import PitsTable from "@/Components/PitsTable";
import EditRemove from "@/utils/ViewEditRemove";
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";

export default function Message({ messages, cols }) {
    // const { errors } = usePage().props;

    // if object convert to array,
    // cols contain table column list from mysql and adding extra column "actions"
    const fields = typeof cols == "object" ? Object.values(cols) : cols;
    const columnFields = ["s.n"];
    columnFields.push(
        ...fields.filter((f) => ["name", "phone", "email"].includes(f))
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
                        // implementing partial reload feature of inertia js
                        removeRoute={
                            "/admin/message/?remove=true&messageId=" +
                            prop.row.original.id
                        }
                        removeTitle={"Message of " + prop.row.original.name}
                        reloadProps={["messages"]}
                        data={{ remove: true, messageId: prop.row.original.id }}
                        isEdit={false}
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
    const data = React.useMemo(() => messages, []);

    //tablecolumn
    const columns = React.useMemo(() => optimizedColumns, []);
    return (
        <AdminLayout title={"Messages"} activeTitle={"Messages"}>
            <PitsTable data={data} columns={columns} />
        </AdminLayout>
    );
}
