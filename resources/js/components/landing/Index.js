import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Container,
    Typography,
    Avatar,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { customStyles } from "../../material-ui/styles";
import { useAuth } from "../auth/AuthProvider";
import AdminImg from "../../../../public/images/admin-home.svg";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "4% 0",
    },
    grid_item: {
        padding: "2% 0",
    },
    title: {
        "&:after": {
            color: theme.palette.secondary.main,
            content: "'Kumustahan:'",
        },
    },
}));

const Welcome = () => {
    const classes = useStyles();

    return (
        <>
            <div id="landing" className={classes.margin}>
                <Container maxWidth="md">
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <Typography
                                color="primary"
                                variant="h2"
                                className={classes.title}
                            >
                                Online
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" variant="h4">
                                Admin Side
                            </Typography>
                        </Grid>
                        <Grid item className={classes.grid_item}>
                            <img src={AdminImg} className="admin-img" />
                        </Grid>
                        <Typography color="primary" component="span">
                            Filter, view and monitor entries or transactions
                            made by students and counselors.
                        </Typography>
                    </Grid>
                </Container>
            </div>

            {/* <Box className={classes.homeMargin}>
                <Container>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid
                            className="grid-padding"
                            container
                            direction="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography
                                    className={`${classes.greenText} ${classes.margin}`}
                                    variant="h2"
                                >
                                    Kumustahan
                                </Typography>
                                <Typography
                                    className={`${classes.greenText} ${classes.subText}`}
                                    variant="h6"
                                >
                                    Admin
                                </Typography>
                                <center>
                                    <img src={AdminImg} className="admin-img" />
                                </center>
                                <center>
                                    <Typography
                                        className={classes.greenText}
                                        component="span"
                                    >
                                        Here, you can filter results and monitor
                                        individuals
                                    </Typography>
                                    <br />
                                    <Typography
                                        className={classes.greenText}
                                        component="span"
                                    >
                                        Register and Login to start.
                                    </Typography>
                                    <br />
                                    <br />
                                </center>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box> */}
        </>
    );
};

const Index = () => {
    const auth = useAuth();
    let location;
    if (auth.user.isLoggedIn && auth.user.data.type === "ched") {
        location = {
            pathname: "/ched/admin",
        };
    } else if (auth.user.isLoggedIn && auth.user.data.type === "school") {
        location = {
            pathname: "/school/admmin",
        };
    } else {
        location = {
            pathname: "/",
        };
    }

    return (
        <>
            {auth.user.isLoggedIn ? (
                <Redirect to={location} />
            ) : (
                <>
                    <Header />
                    <Welcome />
                    <Footer />
                </>
            )}
        </>
    );
};

export default Index;
