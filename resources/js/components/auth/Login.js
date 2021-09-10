import React, { useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Grid,
    Box,
    Typography,
    IconButton,
    TextField,
    LinearProgress,
    InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos, Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { CustomButton } from "../../material-ui/styles";

const useStyles = makeStyles(() => ({
    image: {
        width: "100%",
        height: "auto",
    },
    grid_item: {
        padding: "2% 0",
    },
    top_bg: {
        backgroundImage: "url(./images/auth_top_bg.png)",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
    },
}));

const LoginForm = () => {
    const auth = useAuth();

    const classes = useStyles();

    const handleGoBack = () => {
        history.replace("/");
    };

    const [form, setForm] = useState({
        username: "",
        password: "",
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

    const [inputError, setInputError] = useState(false);
    const [fieldError, setFieldError] = useState({
        username: null,
        password: null,
    });

    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setInputError(false);
        setLoading(true);

        const response = await auth.login(form);
        console.log(response)
        switch (response.status) {
            case 200:
                history.push(from);
                break;
            case 401:
                setLoading(false);
                setInputError(true);
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <Box marginTop="8%">
            <Container maxWidth="lg">
                <Card className={classes.top_bg}>
                    <CardContent>
                        <Grid container direction="column">
                            {loading ? (
                                <Grid item>
                                    <LinearProgress />
                                </Grid>
                            ) : (
                                ""
                            )}
                            <Grid
                                item
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                wrap="nowrap"
                            >
                                <Grid item container direction="column" xs={5}>
                                    <Grid item>
                                        <IconButton
                                            color="primary"
                                            onClick={handleGoBack}
                                        >
                                            <ArrowBackIos />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <img
                                            src="./images/auth_bg.png"
                                            className={classes.image}
                                        />
                                    </Grid>
                                    <Grid item className={classes.grid_item}>
                                        <Link
                                            to={{
                                                pathname: `/ched/admin/create`,
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                variant="body1"
                                            >
                                                Don't have an account yet?
                                                Register
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="column" xs={5}>
                                    <Grid item>
                                        <Typography variant="h4">
                                            Log in
                                        </Typography>
                                    </Grid>
                                    {inputError ? (
                                        <Grid item>
                                            <Typography
                                                color="error"
                                                variant="body2"
                                            >
                                                Please check your username and
                                                password.
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        ""
                                    )}
                                    <Grid item className={classes.grid_item}>
                                        <form
                                            autoComplete="off"
                                            onSubmit={handleOnSubmit}
                                        >
                                            <Grid container direction="column">
                                                <Grid
                                                    item
                                                    className={
                                                        classes.grid_item
                                                    }
                                                >
                                                    <TextField
                                                        autoFocus
                                                        id="username"
                                                        disabled={loading}
                                                        error={
                                                            fieldError.username
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.username
                                                                ? fieldError.username
                                                                : ""
                                                        }
                                                        label="Username"
                                                        name="username"
                                                        onChange={
                                                            handleFormChange
                                                        }
                                                        value={form.username}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    className={
                                                        classes.grid_item
                                                    }
                                                >
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
                                                <Grid item>
                                                    <CustomButton
                                                        type="submit"
                                                        disabled={loading}
                                                        fullWidth
                                                        background="primary"
                                                    >
                                                        Login
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

const Login = () => {
    const auth = useAuth();
    let location;
    if (auth.user.isLoggedIn && auth.user.data.type === "ched") {
        location = {
            pathname: "/ched/admin",
        };
    } else {
        location = {
            pathname: "/school/admin",
        };
    }

    return (
        <>
            {auth.user.isLoggedIn ? (
                <Redirect to={location} />
            ) : (
                <>
                    <LoginForm />
                </>
            )}
        </>
    );
};

export default Login;
