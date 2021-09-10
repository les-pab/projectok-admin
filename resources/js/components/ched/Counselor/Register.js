import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    IconButton,
    Box,
    MenuItem,
    InputLabel,
    TextField,
    FormControl,
    Select,
    LinearProgress,
    InputAdornment,
    FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos, Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory, useLocation, Link, Redirect } from "react-router-dom";
import { CustomButton } from "../../../material-ui/styles";
import reg_bg from "../../../../images/auth_bg.png";
import { storeCounselor } from "../Service";

const useStyles = makeStyles(() => ({
    image: {
        width: "100%",
        height: "auto",
    },
    grid_item: {
        padding: "2% 0",
    },
}));

const RegisterForm = ({ setCounselors }) => {
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const classes = useStyles();

    const handleGoBack = () => {
        history.replace("/ched/admin");
    };

    const [form, setForm] = useState({
        last_name: "",
        first_name: "",
        middle_name: "",
        email: "",
        contact: "",
        designation: "",
        hei: "",
        address: "",
        password: "",
        password_confirmation: "",
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const [fieldError, setFieldError] = useState({
        last_name: null,
        first_name: null,
        middle_name: null,
        email: null,
        contact: null,
        designation: null,
        hei: null,
        address: null,
        password: null,
        password_confirmation: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await storeCounselor(form);
        switch (response.status) {
            case 200:
                setCounselors(response.data[0]);
                history.push(from);
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
            default:
                setLoading(false);
                break;
        }
    };

    return (
        <>
            <Box marginTop="4%" marginBottom="4%">
                <Container maxWidth="lg">
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                {loading ? (
                                    <Grid item className={classes.grid_item}>
                                        {loading ? <LinearProgress /> : ""}
                                    </Grid>
                                ) : (
                                    ""
                                )}
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        className={classes.grid_item}
                                    >
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                onClick={handleGoBack}
                                            >
                                                <ArrowBackIos />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h4">
                                            Create counselor account
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.grid_item}>
                                        <form
                                            autoComplete="off"
                                            onSubmit={handleOnSubmit}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                spacing={2}
                                                className={classes.spacing}
                                            >
                                                <Grid item xs={12}>
                                                    <TextField
                                                        autoFocus
                                                        id="last_name"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.last_name
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.last_name
                                                                ? fieldError.last_name
                                                                : ""
                                                        }
                                                        label="Last Name"
                                                        name="last_name"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.last_name}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="first_name"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.first_name
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.first_name
                                                                ? fieldError.first_name
                                                                : "Note: Please include the second name if applicable"
                                                        }
                                                        label="First Name"
                                                        name="first_name"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.first_name}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="middle_name"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.middle_name
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.middle_name
                                                                ? fieldError.middle_name
                                                                : ""
                                                        }
                                                        label="Middle Name"
                                                        name="middle_name"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.middle_name}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="email"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.email
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.email
                                                                ? fieldError.email
                                                                : "Please note that the email will serve as the username too."
                                                        }
                                                        label="Email Address"
                                                        name="email"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.email}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="contact"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.contact
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.contact
                                                                ? fieldError.contact
                                                                : ""
                                                        }
                                                        label="Contact"
                                                        name="contact"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.contact}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="designation"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.designation
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.designation
                                                                ? fieldError.designation
                                                                : ""
                                                        }
                                                        label="Designation"
                                                        name="designation"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.designation}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl
                                                        id="hei"
                                                        fullWidth
                                                        variant="outlined"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.hei
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <InputLabel id="select-label">
                                                            HEI
                                                        </InputLabel>
                                                        <Select
                                                            labelId="select-label"
                                                            id="hei"
                                                            label="HEI"
                                                            name="hei"
                                                            onChange={
                                                                handleFormChange
                                                            }
                                                            value={form.hei}
                                                        >
                                                            <MenuItem value="University of the Cordilleras">
                                                                University of
                                                                the Cordilleras
                                                            </MenuItem>
                                                            <MenuItem value="Apayao State College">
                                                                Apayao State
                                                                College
                                                            </MenuItem>
                                                            <MenuItem value="Abra State Institute of Science and Technology">
                                                                Abra State
                                                                Institute of
                                                                Science and
                                                                Technology
                                                            </MenuItem>
                                                            <MenuItem value="Baguio Central University">
                                                                Baguio Central
                                                                University
                                                            </MenuItem>
                                                            <MenuItem value="Cordillera Career Development College">
                                                                Cordillera
                                                                Career
                                                                Development
                                                                College
                                                            </MenuItem>
                                                            <MenuItem value="Divine Word College of Bangued">
                                                                Divine Word
                                                                College of
                                                                Bangued
                                                            </MenuItem>
                                                            <MenuItem value="Ifugao State University-Lamut Campus">
                                                                Ifugao State
                                                                University-Lamut
                                                                Campus
                                                            </MenuItem>
                                                            <MenuItem value="Ifugao State University-Nayon Campus">
                                                                Ifugao State
                                                                University-Nayon
                                                                Campus
                                                            </MenuItem>
                                                            <MenuItem value="International School of Asia and Pacific">
                                                                International
                                                                School of Asia
                                                                and Pacific
                                                            </MenuItem>
                                                            <MenuItem
                                                                value="Kings College of the
                                            Philippines"
                                                            >
                                                                Kings College of
                                                                the Philippines
                                                            </MenuItem>
                                                            <MenuItem value="Kalinga State University">
                                                                Kalinga State
                                                                University
                                                            </MenuItem>
                                                            <MenuItem value="Saint Tonis College">
                                                                Saint Tonis
                                                                College
                                                            </MenuItem>
                                                            <MenuItem value="Pines City Colleges">
                                                                Pines City
                                                                Colleges
                                                            </MenuItem>
                                                            <MenuItem value="University of Baguio">
                                                                University of
                                                                Baguio
                                                            </MenuItem>
                                                        </Select>
                                                        <FormHelperText>
                                                            {fieldError.hei
                                                                ? fieldError.hei
                                                                : ""}
                                                        </FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="address"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.address
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.address
                                                                ? fieldError.address
                                                                : "Address of HEI"
                                                        }
                                                        label="Address"
                                                        name="address"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.address}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled={loading}
                                                        error={
                                                            fieldError.password
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.password
                                                                ? fieldError.password
                                                                : ""
                                                        }
                                                        id="password"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={
                                                                            handleClickShowPassword
                                                                        }
                                                                        onMouseDown={
                                                                            handleMouseDownPassword
                                                                        }
                                                                        edge="end"
                                                                    >
                                                                        {!showPassword ? (
                                                                            <Visibility />
                                                                        ) : (
                                                                            <VisibilityOff />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        label="Password"
                                                        name="password"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={form.password}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled={loading}
                                                        error={
                                                            fieldError.password_confirmation
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.password_confirmation
                                                                ? fieldError.password_confirmation
                                                                : ""
                                                        }
                                                        id="password_confirmation"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={
                                                                            handleClickShowPassword
                                                                        }
                                                                        onMouseDown={
                                                                            handleMouseDownPassword
                                                                        }
                                                                        edge="end"
                                                                    >
                                                                        {!showPassword ? (
                                                                            <Visibility />
                                                                        ) : (
                                                                            <VisibilityOff />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        label="Confirm Password"
                                                        name="password_confirmation"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={
                                                            form.password_confirmation
                                                        }
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton
                                                        type="submit"
                                                        fullWidth
                                                        background="primary"
                                                    >
                                                        Create Account
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

const Register = ({ setCounselors }) => {
    return <RegisterForm setCounselors={setCounselors} />;
};

export default Register;
