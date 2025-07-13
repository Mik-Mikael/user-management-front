"use client";
import { ValidateDuplicateType } from "@/model/api/user.type";
import { UserForm } from "@/model/form/userform";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const [res, setRes] = useState("");

  const onSubmit = async (data: UserForm) => {
    console.log("Submitted Data:", data);
    try {
      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      setRes(text);
    } catch (err) {
      console.error("Error:", err);
      setRes("Failed to create user");
    } finally {
      router.push("/");
    }
  };

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Form
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="First Name"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("firstName", {
              required: "First name is required",
              maxLength: {
                value: 20,
                message: "First name cannot exceed 20 characters",
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Last Name"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("lastName", {
              required: "Last name is required",
              maxLength: {
                value: 20,
                message: "Last name cannot exceed 20 characters",
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="ID Card"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("idCard", {
              required: "ID Card is required",
              minLength: {
                value: 7,
                message: "ID Card must be at least 7 characters long",
              },
              maxLength: {
                value: 20,
                message: "ID Card cannot exceed 20 characters",
              },
              validate: async (value) => {
                try {
                  const response = await fetch(
                    `http://localhost:8080/api/v1/users/validate-duplicate?validateDuplicateType=${ValidateDuplicateType.ID_CARD}&value=${value}`
                  );
                  const data = await response.json();
                  console.log("data", data);

                  if (!data.valid) {
                    return "Id card already in use";
                  }

                  return true;
                } catch (error) {
                  return "Error validating Id card";
                }
              },
            })}
            error={!!errors.idCard}
            helperText={errors.idCard?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                inputProps: {
                  max: new Date().toISOString().split("T")[0], // today's date in YYYY-MM-DD
                },
              },
            }}
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Position"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("position", { required: "Position is required" })}
            error={!!errors.position}
            helperText={errors.position?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Role"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("role", { required: "Role is required" })}
            error={!!errors.role}
            helperText={errors.role?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("startDate", { required: "Start date is required" })}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("endDate")}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "wrong format" },
              maxLength: {
                value: 30,
                message: "email cannot exceed 30 characters",
              },
              validate: async (value) => {
                try {
                  const response = await fetch(
                    `http://localhost:8080/api/v1/users/validate-duplicate?validateDuplicateType=${ValidateDuplicateType.EMAIL}&value=${value}`
                  );
                  const data = await response.json();
                  console.log("data", data);

                  if (!data.valid) {
                    return "Email already in use";
                  }

                  return true;
                } catch (error) {
                  return "Error validating email";
                }
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Phone Number"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/, // Regular expression for digits only
                message: "Phone number must contain only digits",
              },
              minLength: {
                value: 7,
                message: "Phone number must be at least 7 digits long",
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 digits",
              },
              validate: async (value) => {
                try {
                  const response = await fetch(
                    `http://localhost:8080/api/v1/users/validate-duplicate?validateDuplicateType=${ValidateDuplicateType.PHONE_NUMBER}&value=${value}`
                  );
                  const data = await response.json();
                  console.log("data", data);

                  if (!data.valid) {
                    return "Phone number already in use";
                  }

                  return true;
                } catch (error) {
                  return "Error validating phone number";
                }
              }
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        <Grid container spacing={2}>
          <Grid>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="info"
              type="button"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateUser;
