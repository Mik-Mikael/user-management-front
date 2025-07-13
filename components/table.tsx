"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { UserDto } from "@/model/api/user.type";
import { IconButton, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useRouter } from "next/navigation";

interface Column {
  id:
    | "id"
    | "firstName"
    | "lastName"
    | "idCard"
    | "dateOfBirth"
    | "position"
    | "role"
    | "startDate"
    | "endDate"
    | "email"
    | "phoneNumber"
    | "edit";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  element?: React.ReactElement;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "firstName", label: "First name", minWidth: 150 },
  { id: "lastName", label: "Last name", minWidth: 150 },
  { id: "idCard", label: "Id card", minWidth: 150 },
  { id: "dateOfBirth", label: "Date of birth", minWidth: 120 },
  { id: "position", label: "Position", minWidth: 120 },
  { id: "role", label: "Role", minWidth: 120 },
  { id: "startDate", label: "Start date", minWidth: 120 },
  { id: "endDate", label: "End date", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "phoneNumber", label: "Phone number", minWidth: 150 },
  {
    id: "edit",
    label: "",
    element: (
      <IconButton onClick={() => {}}>
        <ModeEditIcon />
      </IconButton>
    ),
  },
];

export default function StickyHeadTable(props: {
  dataTable: UserDto[] | undefined;
}) {
  const { dataTable } = props;
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              "& th": {
                color: "black",
                backgroundColor: "#E8E8E8",
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {dataTable ? dataTable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                    {columns.map((column) => {
                        if (column.id === 'edit') {
                            return (
                                <TableCell key={column.id} align='center'>
                                    <IconButton onClick={()=>{router.push(`/${data.id}`)}}><ModeEditIcon/></IconButton>
                                </TableCell>
                            )
                        } else {
                      const value = data[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )}
                    })}
                  </TableRow>
                );
              }) : <Typography>no data</Typography>}
          </TableBody> */}
          <TableBody>
            {dataTable && dataTable.length > 0 ? (
              dataTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                    {columns.map((column) => {
                      if (column.id === "edit") {
                        return (
                          <TableCell key={column.id} align="center">
                            <IconButton
                              onClick={() => router.push(`/${data.id}`)}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </TableCell>
                        );
                      } else {
                        const value = data[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataTable ? dataTable.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
