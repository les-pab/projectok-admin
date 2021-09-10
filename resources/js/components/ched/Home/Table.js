import React, { useState } from "react";
import { Container, Box, Tab, Typography } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    useGridSlotComponentProps,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import StudentPanel from "./StudentPanel";
import CounselorPanel from "./CounselorPanel";
import AppointmentPanel from "./AppointmentPanel";

const useStyles = makeStyles((theme) => ({
    table_header: {
        fontSize: 20,
    },
    table_cell: {
        fontSize: 18,
    },
    toolbar: {
        padding: "8px 16px",
    },
    button: {
        textTransform: "none",
    },
    grid_item: {
        padding: "2% 0",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const Table = ({
    date,
    profile,
    loading,
    setLoading,
    students,
    setStudents,
    counselors,
    setCounselors,
    appointments,
    setAppointments,
}) => {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState("1");
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    return (
        <Container>
            <Box display="flex" flexDirection="column">
                <TabContext value={tabValue}>
                    <TabList
                        onChange={handleTabChange}
                        orientation="horizontal"
                    >
                        <Tab
                            label={
                                <Typography color="primary" variant="h5">
                                    Students
                                </Typography>
                            }
                            value="1"
                        />
                        <Tab
                            label={
                                <Typography color="primary" variant="h5">
                                    Counselors
                                </Typography>
                            }
                            value="2"
                        />
                        <Tab
                            label={
                                <Typography color="primary" variant="h5">
                                    Appointments
                                </Typography>
                            }
                            value="3"
                        />
                    </TabList>
                    <StudentPanel
                        date={date}
                        profile={profile}
                        useStyles={useStyles}
                        loading={loading}
                        setLoading={setLoading}
                        students={students}
                        setStudents={setStudents}
                    />
                    <CounselorPanel
                        date={date}
                        profile={profile}
                        useStyles={useStyles}
                        loading={loading}
                        setLoading={setLoading}
                        counselors={counselors}
                        setCounselors={setCounselors}
                    />
                    <AppointmentPanel
                        date={date}
                        profile={profile}
                        useStyles={useStyles}
                        loading={loading}
                        setLoading={setLoading}
                        appointments={appointments}
                        setAppointments={setAppointments}
                    />
                </TabContext>
            </Box>
        </Container>
    );
};

export default Table;
