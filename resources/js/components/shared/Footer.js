import React from "react";
import { Container, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import projectok_logo from "../../../images/projectok_logo_white.svg";
import footer_bg from "../../../images/footer_bg.png";

const useStyle = makeStyles((theme) => ({
    box: {
        backgroundImage: `url(${footer_bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "60px 0",
    },
    title: {
        "&:before": {
            color: theme.palette.common.white,
            content: "'Online'",
        },
    },
    link: {
        color: theme.palette.common.white,
        cursor: "pointer",
    },
    copyright: {
        color: theme.palette.common.white,
    },
    padding: {
        padding: "18px 0",
    },
}));

const Footer = () => {
    const classes = useStyle();

    return (
        <div id="footer" className={classes.box}>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        className={classes.padding}
                    >
                        <Grid item container md={3} lg={3} direction="column">
                            <Grid item>
                                <img src={projectok_logo} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h4"
                                    color="secondary"
                                    className={classes.title}
                                >
                                    Kumustahan
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container md={7} lg={7} direction="row">
                            <Grid
                                item
                                container
                                md={4}
                                lg={4}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        ABOUT
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        About
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="https://ched.gov.ph/"
                                        target="_blank"
                                        rel="noopener"
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        CHED
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="https://www.facebook.com/chedcar.stufaps/"
                                        target="_blank"
                                        rel="noopener"
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        CHED-CAR
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                md={4}
                                lg={4}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        SERVICES
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="#services"
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        Private Session
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="#services"
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        Diary
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                md={4}
                                lg={4}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography variant="h6" color="secondary">
                                        SUPPORT
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link
                                        variant="subtitle1"
                                        className={classes.link}
                                    >
                                        Contact Us
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.padding}>
                        <Typography className={classes.copyright}>
                            Copyright © 2021 UC-CITCS IT GROUP 1
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
