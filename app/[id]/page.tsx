"use client";
import { UserDto, ValidateDuplicateType } from "@/model/api/user.type";
import { UserForm, UserUpdateForm } from "@/model/form/userform";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function UpdateUser() {
  const { id } = useParams();
  const router = useRouter();
  const [userRes, setUserRes] = useState<UserDto>();

  if (!!id) {
    useEffect(() => {
      if (!!id) {
        fetch(`http://localhost:8080/api/v1/users/${id}`)
          .then((res) => res.json())
          .then((data) => setUserRes(data))
          .catch((err) => console.error("Error fetching user:", err));
      }
    }, [id]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm<UserUpdateForm>({
      defaultValues: {
        id: "",
        firstName: "",
        lastName: "",
        idCard: "",
        dateOfBirth: "",
        position: "",
        role: "",
        startDate: "",
        endDate: "",
        email: "",
        phoneNumber: "",
      },
    });
    useEffect(() => {
      if (!!userRes) {
        // reset(userRes as UserForm)
        reset({
            id: userRes.id,
          firstName: userRes.firstName,
          lastName: userRes.lastName,
          idCard: userRes.idCard,
          dateOfBirth: userRes.dateOfBirth,
          position: userRes.position,
          role: userRes.role,
          startDate: userRes.startDate,
          endDate: userRes.endDate,
          email: userRes.email,
          phoneNumber: userRes.phoneNumber,
        });

        // setValue('firstName', userRes.firstName, {shouldDirty: true})
      }
    }, [userRes, reset]);
    const [res, setRes] = useState("");

    const onSubmit = async (data: UserUpdateForm) => {
      console.log("Submitted Data:", data);
      try {
        const res = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
          method: "PATCH",
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
            <Grid size={{ xs: 12}}>
            <TextField
              label="User ID"
              disabled
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("id", { required: "User id is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="First Name"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("firstName", { required: "First name is required", maxLength: {
                value: 20,
                message: "First name cannot exceed 20 characters",
              }, })}
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
              // slotProps={{ shrink: true }}
              {...register("lastName", { required: "Last name is required", maxLength: {
                value: 20,
                message: "Last name cannot exceed 20 characters",
              }})}
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
              {...register("idCard", { required: "ID Card is required", minLength: {
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
                    `http://localhost:8080/api/v1/users/validate-duplicate/${id}?validateDuplicateType=${ValidateDuplicateType.ID_CARD}&value=${value}`
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
              }
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
              }
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
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "wrong format" },
              maxLength: {
                value: 30,
                message: "email cannot exceed 30 characters",
              },validate: async (value) => {
                try {
                  const response = await fetch(
                    `http://localhost:8080/api/v1/users/validate-duplicate/${id}?validateDuplicateType=${ValidateDuplicateType.EMAIL}&value=${value}`
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
              }})}
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
                                    `http://localhost:8080/api/v1/users/validate-duplicate/${id}?validateDuplicateType=${ValidateDuplicateType.PHONE_NUMBER}&value=${value}`
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
                Edit
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
  } else {
    return <>ID Not found</>;
  }
}

export default UpdateUser;
