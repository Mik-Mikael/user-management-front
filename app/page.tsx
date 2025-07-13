"use client";

import StickyHeadTable from "@/components/table";
import { UserDto } from "@/model/api/user.type";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [searchRes, setSearchRes] = useState<UserDto[]>();

  useEffect(() => {
    if (search === "") {
      fetch(`http://localhost:8080/api/v1/users`)
        .then((res) => res.json())
        .then((data) => setSearchRes(data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [search]);
  function searchUser() {
    if (!!search) {
      fetch(`http://localhost:8080/api/v1/users/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => setSearchRes(data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }
  return (
    <Box
      sx={{
        // justifyContent: "space-between",
        // display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "#F8F8F8",
        p: 2,
      }}
    >
      <Stack
        // display="flex"
        justifyContent="space-between"
        direction="row"
        width="100%"
        height="60px"
        spacing={1}
        sx={{ pb: 2, my: 2 }}
      >
        <Typography variant="h4">User Management</Typography>
        {/* <Box sx={{ flex: 1 }} /> */}
        <Button
          variant="contained"
          onClick={() => router.push("/create")}
          sx={{ height: "fitContent" }}
        >
          Create
        </Button>
      </Stack>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
        }}
      >
        <Stack direction="row" width="100%" spacing={1} sx={{ pb: 2 }}>
          <TextField
            sx={{ flex: 1 }}
            label="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearch("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" onClick={searchUser}>
            Search
          </Button>
        </Stack>
        <StickyHeadTable dataTable={searchRes} />
      </Card>
    </Box>
  );
}

export default Home;
