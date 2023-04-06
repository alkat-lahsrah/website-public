import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { supabase } from "../../helpers/supabaseClient";

export const Leads = ({ session }) => {

  const [data,setData]=useState([{}]);


  useEffect(() => {
    async function getLeads() {
      const { user } = session;
      console.log(session);

      let { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("user_id", user.id)

      if (error) {
        console.log(error);
      } else if (data) {
        setData(data);
        console.log(data);
      }
    }
    getLeads();
  }, [session])

  // const data = React.useMemo(
  //   () => [
  //     {
  //       col1: "123",
  //       col2: "John Doe",
  //       col3: "Processing",
  //       col4: "New York",
  //       col5: "2021-10-10",
  //     },
  //   ],

  //   []
  // );

  const columns = React.useMemo(
    () => [
      {
        Header: "LEAD ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "LEAD NAME",
        accessor: "name",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "LOCATION",
        accessor: "location_or_university",
      },
      {
        Header: "CREATED AT",
        accessor: "created_at",
      },
    ],

    []
  );

  const tableInstance = useTable({ columns: columns, data: data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="max-w-[1700px] overflow-x-auto rounded-sm bg-white w-screen">
      <div className="flex flex-col justify-between m-10">
        {/* top */}
        <div className="flex">
          <p className="text-3xl font-bold py-2">Leads</p>
        </div>

        {/* bottom */}
        <div className="flex gap-5"></div>
        <table className="border-2">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="font-bold p-3 text-lg"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="border-y-2 items-center p-3 text-lg"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
