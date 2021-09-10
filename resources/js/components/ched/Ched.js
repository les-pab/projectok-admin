import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Container,
    Fade,
    Card,
    CardContent,
    Backdrop,
    Modal,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ScrollToTop from "../shared/ScrollToTop";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Register from "./Counselor/Register";
import Index from "./Home/Index";
import { fetchProfile } from "./Service";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    grid_item: {
        padding: "2% 0",
    },
}));

const Counsellor = () => {
    const auth = useAuth();

    let { path } = useRouteMatch();

    const _id = auth.user.data._id;

    const [profile, setProfile] = useState("");
    useEffect(() => {
        const getProfile = async () => {
            const response = await fetchProfile(_id);
            switch (response.status) {
                case 200:
                    setProfile(response.data[0]);
                    break;
            }
        };

        getProfile();
    }, []);

    const [counselors, setCounselors] = useState([]);

    const [noDateModal, setNoDateModal] = useState(false);
    const handleNoDateModalOpen = () => {
        setNoDateModal(true);
    };
    const handleNoDateModalClose = () => {
        setNoDateModal(false);
    };

    const [internetDate, setInternetDate] = useState(new Date());
    useEffect(() => {
        fetch("http://worldtimeapi.org/api/timezone/Asia/Manila")
            .then((res) => res.json())
            .then(
                (result) => {
                    setInternetDate(new Date(result.datetime));
                },
                (error) => {
                    handleNoDateModalOpen();
                }
            );
    }, []);

    return (
        <>
            <>
                <Header _name={`${profile.last_name}, ${profile.first_name}`} />
                <Switch>
                    <Route exact path={path}>
                        <ScrollToTop />
                        <Index
                            _id={`${_id}`}
                            profile={profile}
                            date={internetDate}
                            counselors={counselors}
                            setCounselors={setCounselors}
                        />
                    </Route>
                    <Route path={`${path}/counselor/register`}>
                        <ScrollToTop />
                        <Register
                            counselors={counselors}
                            setCounselors={setCounselors}
                        />
                    </Route>
                    {/* <Route path={`${path}/appointment`}>
                        <ScrollToTop />
                        <Appointments
                            _id={`${_id}`}
                            counselor={counselor}
                            appointments={appointments}
                            setAppointments={setAppointments}
                            date={internetDate}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </Route> */}
                    {/* <Route path={`${path}/:id`}>
                        <ScrollToTop />
                        <Profile
                            _id={`${_id}`}
                            profile={counselor}
                            setProfile={setCounselor}
                        />
                    </Route> */}
                </Switch>
                <Footer />
            </>

            <NoticeNoDateModal
                noDateModal={noDateModal}
                handleNoDateModalClose={handleNoDateModalClose}
            />
        </>
    );
};

const NoticeNoDateModal = ({ noDateModal, handleNoDateModalClose }) => {
    const classes = useStyles();

    return (
        <Modal
            open={noDateModal}
            onClose={handleNoDateModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={noDateModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography color="error" variant="h4">
                                            NOTICE:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={handleNoDateModalClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        An error occured while getting the
                                        current date and time, please reload or
                                        refresh the page.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default Counsellor;
