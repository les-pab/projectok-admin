import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { fetchStudents, fetchCounselors, fetchAppointments } from "../Service";
import banner_bg from "../../../../images/counsellor_bg.png";
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: "1%",
        marginBottom: "1%",
    },
    banner: {
        backgroundImage: `url(${banner_bg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        padding: "8% 0",
    },
    welcome: {
        display: "block",
        "&:before": {
            content: "'Hello, '",
            display: "block",
            whiteSpace: "pre",
        },
    },
    date: {
        textAlign: "center",
        padding: 8,
        margin: "16px 0",
        borderTop: "2px solid",
        borderBottom: "2px solid",
    },
    link_route: {
        color: theme.palette.primary.dark,
        "&:hover": {
            textDecoration: "none",
            color: theme.palette.primary.dark,
        },
    },
}));

const Index = ({ _id, profile, date, counselors, setCounselors }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [students, setStudents] = useState([]);
    useEffect(() => {
        setLoading(true);

        const getStudents = async () => {
            const response = await fetchStudents();
            console.log(response);
            switch (response.status) {
                case 200:
                    setStudents(response.data[0]);
                    setLoading(false);
                    break;
            }
        };

        getStudents();
    }, []);

    useEffect(() => {
        setLoading(true);

        const getCounselors = async () => {
            const response = await fetchCounselors();
            console.log(response);
            switch (response.status) {
                case 200:
                    setCounselors(response.data[0]);
                    setLoading(false);
                    break;
            }
        };

        getCounselors();
    }, []);

    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        setLoading(true);

        const getAppointments = async () => {
            const response = await fetchAppointments();
            console.log(response);
            switch (response.status) {
                case 200:
                    setAppointments(response.data[0]);
                    setLoading(false);
                    break;
            }
        };

        getAppointments();
    }, []);

    // useEffect(() => {
    //     Echo.channel(`appointment`).listen("AppointmentEvent", (e) => {
    //         const parsedAppointment = JSON.parse(e.appointments);

    //         console.log(parsedAppointment);
    //     });
    // }, []);

    return (
        <>
            <div id="banner" className={classes.banner}>
                <Container>
                    <Typography
                        color="primary"
                        variant="h1"
                        className={classes.welcome}
                    >
                        {profile
                            ? `${profile.last_name}, ${profile.first_name}`
                            : ""}
                    </Typography>
                </Container>
            </div>

            <div id="today">
                <Container>
                    <Typography
                        color="primary"
                        className={classes.date}
                        variant="h5"
                        gutterBottom={true}
                    >
                        {date.toDateString()}
                    </Typography>
                </Container>
            </div>

            <div id="create-account">
                <Container maxWidth="sm">
                    <Card>
                        <CardContent>
                            <Link
                                to="/ched/admin/counselor/register"
                                className={classes.link_route}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <Box>
                                        <PersonAddIcon
                                            color="primary"
                                            style={{
                                                fontSize: 128,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            color="primary"
                                            variant="h5"
                                        >
                                            Create a counselor account
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </CardContent>
                    </Card>
                </Container>
            </div>

            <div id="table" className={classes.margin}>
                <Table
                    date={date}
                    profile={profile}
                    loading={loading}
                    setLoading={setLoading}
                    students={students}
                    setStudents={setStudents}
                    counselors={counselors}
                    setCounselors={setCounselors}
                    appointments={appointments}
                    setAppointments={setAppointments}
                />
            </div>
        </>
    );
};

export default Index;
