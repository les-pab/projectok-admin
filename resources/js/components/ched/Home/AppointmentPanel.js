import React, { useState } from "react";
import {
    Container,
    Box,
    Tab,
    Typography,
    Grid,
    Button,
    Menu,
    MenuItem,
    InputLabel,
    TextField,
    FormControl,
    Select,
    Badge,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TabPanel from "@material-ui/lab/TabPanel";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CSVLink } from "react-csv";
import FilterListIcon from "@material-ui/icons/FilterList";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { fetchAppointments, fetchAppointmentsWithFilters } from "../Service";

const FiltersMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        padding: 16,
        width: 1024,
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
));

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        padding: 16,
        width: 512,
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
));

const CustomToolbar = ({
    idate,
    profile,
    isFiltered,
    setIsFiltered,
    useStyles,
    setLoading,
    appointments,
    setAppointments,
    filteredData,
    setFilteredData,
}) => {
    const classes = useStyles();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const [anchorToFilterButton, setAnchorToFilterButton] = useState(null);
    const handleOpenFilterList = (e) => {
        setAnchorToFilterButton(e.currentTarget);
    };
    const handleCloseFilterList = () => {
        setAnchorToFilterButton(null);
    };

    const [anchorToExportButton, setAnchorToExportButton] = useState(null);
    const handleOpenExportList = (e) => {
        setAnchorToExportButton(e.currentTarget);
    };
    const handleCloseExportList = () => {
        setAnchorToExportButton(null);
    };

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [filters, setFilters] = useState({
        slast_name: "",
        sfirst_name: "",
        smiddle_name: "",
        school: "",
        clast_name: "",
        cfirst_name: "",
        cmiddle_name: "",
        status: "",
    });
    const handleFilterSelect = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };
    const handleApplyFilters = async () => {
        setLoading(true);

        const formFilters = [];
        const studentFilters = [];
        const counselorFilters = [];
        if (filters.slast_name) {
            studentFilters.push([
                "last_name",
                "like",
                `%${filters.slast_name}%`,
            ]);
        }

        if (filters.sfirst_name) {
            studentFilters.push([
                "first_name",
                "like",
                `%${filters.sfirst_name}%`,
            ]);
        }

        if (filters.smiddle_name) {
            studentFilters.push([
                "middle_name",
                "like",
                `%${filters.smiddle_name}%`,
            ]);
        }

        if (filters.school) {
            studentFilters.push(["school", "=", filters.school]);
        }

        if (date) {
            const split = date.toISOString().split("T");
            formFilters.push(["date", "like", `${split[0]}%`]);
        }

        if (time) {
            const split = time.toISOString().split("T");
            const splitTime = split[1].split(":");
            formFilters.push([
                "time",
                "like",
                `%${splitTime[0]}:${splitTime[1]}%`,
            ]);
        }

        if (filters.status) {
            formFilters.push(["status", "=", filters.status]);
        }

        if (filters.clast_name) {
            counselorFilters.push([
                "last_name",
                "like",
                `%${filters.clast_name}%`,
            ]);
        }

        if (filters.cfirst_name) {
            counselorFilters.push([
                "first_name",
                "like",
                `%${filters.cfirst_name}%`,
            ]);
        }

        if (filters.cmiddle_name) {
            counselorFilters.push([
                "middle_name",
                "like",
                `%${filters.cmiddle_name}%`,
            ]);
        }

        const form = {
            filters: formFilters,
            student_filters: studentFilters,
            counselor_filters: counselorFilters,
        };

        const response = await fetchAppointmentsWithFilters(form);
        switch (response.status) {
            case 200:
                const data = response.data[0];

                if (response.data[0].length <= 0) {
                    setFilteredData([]);
                } else if (!data[0].student || !data[0].counselor) {
                    setFilteredData([]);
                } else {
                    setFilteredData(response.data[0]);
                }
                setIsFiltered(true);
                handleCloseFilterList();
                setLoading(false);
                break;
        }
    };
    const handleClearFilters = async () => {
        setLoading(true);

        setFilters({
            slast_name: "",
            sfirst_name: "",
            smiddle_name: "",
            school: "",
            clast_name: "",
            cfirst_name: "",
            cmiddle_name: "",
            status: "",
        });
        setDate("");
        setTime("");

        const response = await fetchAppointments();
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setFilteredData([]);
                setIsFiltered(false);
                handleCloseFilterList();
                setLoading(false);
                break;
        }
    };

    const [exportLoading, setExportLoading] = useState(false);
    const handleExportAsPDF = () => {
        setExportLoading(true);

        const headers = [
            { text: "Student Name", style: "tableHeader" },
            { text: "School", style: "tableHeader" },
            { text: "Consultation Date", style: "tableHeader" },
            { text: "Consultation Time", style: "tableHeader" },
            { text: "Consulted By", style: "tableHeader" },
            { text: "HEI", style: "tableHeader" },
            { text: "Status", style: "tableHeader" },
        ];

        const rows = [];

        if (isFiltered) {
            filteredData.map((appointment) => {
                const adate = new Date(appointment.date).toDateString();
                const atime = format(new Date(appointment.time), "hh:mm aa");

                if (appointment.student && appointment.counselor) {
                    rows.push([
                        `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                        appointment.student.school,
                        adate,
                        atime,
                        `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                        appointment.counselor.hei,
                        appointment.status,
                    ]);
                }
            });
        } else {
            appointments.map((appointment) => {
                const adate = new Date(appointment.date).toDateString();
                const atime = format(new Date(appointment.time), "hh:mm aa");

                rows.push([
                    `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                    appointment.student.school,
                    adate,
                    atime,
                    `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                    appointment.counselor.hei,
                    appointment.status,
                ]);
            });
        }

        var docDefinition = {
            pageSize: "LETTER",

            pageOrientation: "landscape",

            pageMargins: 40,

            header: {
                style: "header",

                columns: [
                    {
                        svg: `<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                    <path d="M20.551 9.53174C20.2242 9.18893 19.0089 9.15549 18.2462 9.38124C18.045 11.0284 17.8355 12.6755 17.6343 14.3227L17.4416 15.836V15.8695C17.2153 17.5751 17.0476 19.0969 16.9806 20.142C16.9974 20.1587 17.0225 20.1671 17.0393 20.1838C17.3075 19.6403 17.6679 18.6872 17.7098 18.5868C18.7407 15.9614 19.7548 13.3277 20.8025 10.7023C20.9953 10.2257 20.8695 9.86618 20.551 9.53174Z" fill="#289672"/>
                    <path d="M15.1031 6.19556C15.3127 7.74236 15.5306 9.30589 15.7485 10.8193C15.9078 11.948 16.0754 13.0935 16.2346 14.2473C16.4023 15.468 16.5615 16.6888 16.7124 17.9095C16.8381 16.764 16.9722 15.7941 16.9722 15.7774C17.2236 13.7289 17.4834 11.6805 17.7349 9.63198C17.8271 8.92128 17.9109 8.21059 18.0031 7.49989C18.1037 6.65542 18.2126 5.81931 18.3048 4.97483C18.3467 4.60694 18.4054 4.21397 18.1623 3.87953C17.8606 3.46983 17.2152 3.26917 16.5615 3.26917C15.8575 3.26917 15.145 3.49492 14.8182 3.93805C14.8517 4.22233 14.8936 4.51497 14.9271 4.79925C14.9858 5.25911 15.0445 5.7357 15.1031 6.19556Z" fill="#289672"/>
                    <path d="M11.6416 15.1588C12.0104 15.2591 12.3121 15.3511 12.6139 15.4765C13.1 15.6688 13.5023 15.836 13.8627 16.0032C13.9465 16.0451 14.0303 16.0869 14.1057 16.1203C14.1896 16.1621 14.2734 16.2039 14.3488 16.2541C14.8014 16.5133 15.1366 16.8059 15.4216 17.2323L15.43 17.2407C15.6898 17.6337 16.0837 18.428 16.3603 19.0551C16.3184 18.6537 16.2849 18.3527 16.2681 18.244C16.1508 17.2909 16.0334 16.3293 15.9077 15.3762C15.497 12.3327 15.0361 9.29763 14.6338 6.25418C14.5835 5.85284 14.5332 5.45151 14.4829 5.05018C14.4578 4.84115 14.4326 4.62376 14.4075 4.41473C14.3823 4.22243 14.3572 4.02176 14.332 3.82945C14.1979 2.78431 14.0471 1.74753 13.8292 0.719117C13.7118 0.158922 13.6364 0.0920327 13.0581 0.0502271C12.7899 0.0335048 12.53 0.00842146 12.2618 -0.00830078C12.2367 -0.00830078 12.2199 -0.00830078 12.1948 -0.00830078C11.3315 -0.00830078 10.4179 0.852895 10.2168 1.62212C9.96536 2.57529 10.0743 3.55354 10.2503 4.48162C10.6945 6.85618 11.2728 12.4665 11.6416 15.1588Z" fill="#289672"/>
                    <path d="M17.5589 22.0567C17.5002 21.7975 17.3996 21.5551 17.3074 21.3042C17.2488 21.137 17.1566 20.9782 17.0476 20.8444C17.0225 20.8109 16.989 20.7775 16.9554 20.744C16.8968 20.6855 16.8381 20.6353 16.7794 20.5852C16.7627 20.5685 16.7459 20.5601 16.7291 20.5434C16.6872 20.5099 16.6453 20.4848 16.6034 20.4598C16.5783 20.443 16.5447 20.4263 16.5196 20.4012C16.5112 20.3929 16.5028 20.3929 16.4945 20.3845C16.4525 20.3511 16.419 20.3176 16.3855 20.2842C16.2682 20.142 16.2262 19.9999 16.2179 19.9581C16.1173 19.5986 15.4133 18.0685 15.0361 17.5083C14.8601 17.2491 14.6589 17.0401 14.4075 16.8561C14.3237 16.7976 14.2399 16.7474 14.1477 16.6889C14.0722 16.6387 13.9884 16.5969 13.8962 16.5468C13.5107 16.3461 13.0413 16.1538 12.4295 15.9113C12.2032 15.8193 11.9685 15.7441 11.7087 15.6688C11.6249 15.6438 11.5495 15.627 11.4573 15.602C11.3818 15.5852 11.298 15.5601 11.2058 15.5434C10.8789 15.4598 10.4934 15.3762 10.0073 15.2675C9.72232 15.209 9.35354 15.1254 8.8758 15.1254C8.76684 15.1254 8.65789 15.1254 8.54893 15.1421C8.40645 15.1505 8.28911 15.1588 8.19691 15.1839C6.83075 15.5016 5.55679 16.0618 4.25768 16.5718C3.70451 16.7892 3.50335 17.0986 3.56202 17.7006C3.65422 18.5785 4.08167 19.2725 4.79408 19.7909C5.04552 19.9748 5.31373 20.0584 5.60707 20.0584C5.67412 20.0584 5.74956 20.0501 5.82499 20.0417C6.32787 19.9748 6.78884 19.7741 7.2582 19.6069C7.58507 19.4899 7.90357 19.4146 8.23882 19.4146C8.42321 19.4146 8.61598 19.4397 8.80875 19.4899C9.45412 19.6655 10.1079 19.816 10.77 19.9163C11.2058 19.9832 11.5746 20.117 11.8763 20.3678C11.9685 20.443 12.0523 20.535 12.3205 20.928C12.572 21.2959 12.8821 21.7725 12.9827 21.9564C13.3431 22.6253 13.7621 24.6988 12.5636 26.4714C11.6081 27.8761 10.1749 28.3025 9.68879 28.4195C9.42059 28.4864 9.05181 28.5784 8.59084 28.5784C8.3813 28.5784 8.14662 28.5617 7.90357 28.5032C6.8559 28.2858 6.21053 27.6336 5.82499 27.2323C5.33049 26.7306 4.60131 25.9948 4.48397 24.933C4.35825 23.8042 4.86951 21.8393 4.81923 21.1955C4.81923 21.1621 4.81085 21.1287 4.81085 21.1287C4.79408 20.9614 4.72703 20.6019 4.45883 20.2842C4.24091 20.0166 3.91404 19.841 3.51174 19.7491C3.11781 19.6655 2.72389 19.6236 2.32996 19.6236C2.22939 19.6236 2.12043 19.6236 2.01985 19.632C1.74327 19.6487 1.35773 19.7574 1.01409 20.0584C0.787796 20.2591 0.653694 20.4848 0.494448 20.8778C0.335202 21.2875 0.226245 21.6972 -0.00843312 23.4029C-0.075484 23.9045 0.293296 26.9313 0.829702 28.4446C1.03085 29.0048 2.48921 30.6436 3.42792 31.2456C4.32473 31.8225 5.96747 32.876 8.3394 32.968C8.45673 32.9764 8.56569 32.9764 8.68303 32.9764C11.0047 32.9764 13.1084 32.0399 14.4159 30.8526C15.0445 30.2841 15.9413 29.2557 16.6286 27.8928C16.7207 27.7089 16.7878 27.5584 16.8381 27.4497C16.9722 27.4497 17.0811 27.4497 17.1566 27.458C17.3242 27.4664 17.4499 27.4747 17.5421 27.4747C17.6846 27.4747 17.7684 27.458 17.8355 27.3911C17.8858 27.341 17.9109 27.2741 17.9193 27.2741C17.9528 27.1821 17.936 27.0985 17.9193 27.0483C17.8941 26.9396 17.8355 26.8811 17.8187 26.8393C17.6678 26.5717 18.2126 26.0868 18.0785 25.8945C18.045 25.8443 17.9612 25.8192 17.7852 25.7691C17.7181 25.744 17.6595 25.7356 17.6176 25.7273C17.6427 25.7273 17.6678 25.7273 17.693 25.7273C17.8187 25.7273 17.9193 25.7105 17.9863 25.6855C18.0869 25.6604 18.1121 25.6353 18.1372 25.6019C18.1707 25.5433 18.1372 25.5015 18.1288 25.3761C18.1288 25.3259 18.1121 25.2005 18.1623 25.0918C18.1959 25.0166 18.2629 24.9497 18.3551 24.8912C18.5982 24.7323 18.6652 24.4898 18.4725 24.2473C17.9863 23.6119 17.7433 22.851 17.5589 22.0567Z" fill="#289672"/>
                    <path d="M16.7471 20.2681C16.7371 20.2581 16.7371 20.2681 16.7471 20.2681C16.7371 20.2681 16.7471 20.2681 16.7471 20.2681Z" fill="#107239"/>
                    <path d="M31.7653 32.3492L24.616 26.4546C24.1886 26.1034 24.1718 25.4596 24.5657 25.0834L31.8911 18.0767C32.1257 17.851 31.9665 17.458 31.6396 17.458H27.583L19.6124 25.0834C19.2184 25.4596 19.2352 26.1034 19.6627 26.4546L27.583 32.9846H31.5307C31.8743 32.9846 32.0252 32.5582 31.7653 32.3492Z" fill="#E4CB10"/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width="32" height="32.9846" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                `,
                        width: 32,
                    },
                    {
                        text: [
                            {
                                text: "Online",
                                fontSize: 16,
                                style: "greenText",
                            },
                            {
                                text: "Kumustahan ",
                                fontSize: 16,
                                style: "yellowText",
                            },
                        ],
                        width: "auto",
                        margin: [0, 8, 0, 0],
                    },
                    {
                        width: "56%",
                        text: " ",
                    },
                    {
                        text: [
                            {
                                text: `Date Generated: ${idate.toDateString()} \n`,
                                fontSize: 8,
                            },
                            {
                                text: `Report Generated By: ${profile.last_name}, ${profile.first_name}`,
                                fontSize: 8,
                            },
                        ],
                        width: "auto",
                        margin: [0, 8, 0, 0],
                    },
                ],
            },

            footer: function (currentPage, pageCount) {
                return {
                    style: "footer",

                    columns: [
                        {
                            text: `Page: ${currentPage.toString()} of ${pageCount}`,
                            fontSize: 8,
                        },
                    ],
                };
            },

            content: [
                {
                    text: "Appointments:",
                    alignment: "left",
                    style: "greenText",
                    fontSize: 24,
                    margin: [0, 4, 0, 4],
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "*", "*", "*", "*", "*", "*"],

                        body: [headers, ...rows],
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return i === 0 || i === node.table.body.length
                                ? 2
                                : 1;
                        },
                        vLineWidth: function (i, node) {
                            return i === 0 || i === node.table.widths.length
                                ? 2
                                : 1;
                        },
                        hLineColor: function (i, node) {
                            return i === 0 || i === node.table.body.length
                                ? "black"
                                : "gray";
                        },
                        vLineColor: function (i, node) {
                            return i === 0 || i === node.table.widths.length
                                ? "black"
                                : "gray";
                        },
                        fillColor: function (rowIndex, node, columnIndex) {
                            return rowIndex % 2 === 0 ? "#CCCCCC" : null;
                        },
                    },
                },
            ],

            styles: {
                header: {
                    margin: [20, 5, 20, 5],
                },
                footer: {
                    margin: [20, 5, 20, 5],
                },
                greenText: {
                    color: "#289672",
                },
                yellowText: {
                    color: "#E9D700",
                },
            },
        };

        pdfMake.createPdf(docDefinition).download();

        setExportLoading(false);
    };

    const csvHeaders = [
        { label: "Student Name", key: "sname" },
        { label: "School", key: "school" },
        { label: "Consultation Date", key: "cdate" },
        { label: "Consultation Time", key: "ctime" },
        { label: "Consulted By", key: "cname" },
        { label: "HEI", key: "hei" },
        { label: "Status", key: "status" },
    ];

    const csvRows = [];

    if (isFiltered) {
        filteredData.map((appointment) => {
            const adate = new Date(appointment.date).toDateString();
            const atime = format(new Date(appointment.time), "hh:mm aa");

            if (appointment.student && appointment.counselor) {
                csvRows.push({
                    sname: `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                    school: appointment.student.school,
                    cdate: adate,
                    ctime: atime,
                    cname: `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                    hei: appointment.counselor.hei,
                    status: appointment.status,
                });
            }
        });
    } else {
        appointments.map((appointment) => {
            const adate = new Date(appointment.date).toDateString();
            const atime = format(new Date(appointment.time), "hh:mm aa");

            csvRows.push({
                sname: `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                school: appointment.student.school,
                cdate: adate,
                ctime: atime,
                cname: `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                hei: appointment.counselor.hei,
                status: appointment.status,
            });
        });
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            wrap="nowrap"
            className={classes.toolbar}
        >
            <Grid item>
                <Badge color="secondary" variant="dot" invisible={!isFiltered}>
                    <Button
                        color="primary"
                        startIcon={<FilterListIcon />}
                        onClick={handleOpenFilterList}
                        className={classes.button}
                    >
                        Filters
                    </Button>
                </Badge>
                <FiltersMenu
                    anchorEl={anchorToFilterButton}
                    keepMounted
                    open={Boolean(anchorToFilterButton)}
                    onClose={handleCloseFilterList}
                >
                    <Grid
                        container
                        directon="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            wrap="nowrap"
                            spacing={2}
                            xs={12}
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                wrap="nowrap"
                                xs={4}
                            >
                                <Grid item>
                                    <Typography variant="h5">
                                        Student:
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Last Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="slast_name"
                                            fullWidth
                                            name="slast_name"
                                            onChange={handleFilterSelect}
                                            value={filters.slast_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>First Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="sfirst_name"
                                            fullWidth
                                            name="sfirst_name"
                                            onChange={handleFilterSelect}
                                            value={filters.sfirst_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Middle Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="smiddle_name"
                                            fullWidth
                                            name="smiddle_name"
                                            onChange={handleFilterSelect}
                                            value={filters.smiddle_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    alignItems="center"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>School</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl
                                            id="school"
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <Select
                                                id="school"
                                                name="school"
                                                onChange={handleFilterSelect}
                                                value={filters.school}
                                            >
                                                <MenuItem value="University of the Cordilleras">
                                                    University of the
                                                    Cordilleras
                                                </MenuItem>
                                                <MenuItem value="Apayao State College">
                                                    Apayao State College
                                                </MenuItem>
                                                <MenuItem value="Abra State Institute of Science and Technology">
                                                    Abra State Institute of
                                                    Science and Technology
                                                </MenuItem>
                                                <MenuItem value="Baguio Central University">
                                                    Baguio Central University
                                                </MenuItem>
                                                <MenuItem value="Cordillera Career Development College">
                                                    Cordillera Career
                                                    Development College
                                                </MenuItem>
                                                <MenuItem value="Divine Word College of Bangued">
                                                    Divine Word College of
                                                    Bangued
                                                </MenuItem>
                                                <MenuItem value="Ifugao State University - Lamut Campus">
                                                    Ifugao State University -
                                                    Lamut Campus
                                                </MenuItem>
                                                <MenuItem value="International School of Asia and Pacific">
                                                    International School of Asia
                                                    and Pacific
                                                </MenuItem>
                                                <MenuItem
                                                    value="Kings College of the
                                            Philippines"
                                                >
                                                    Kings College of the
                                                    Philippines
                                                </MenuItem>
                                                <MenuItem value="Kalinga State University">
                                                    Kalinga State University
                                                </MenuItem>
                                                <MenuItem value="Saint Tonis College">
                                                    Saint Tonis College
                                                </MenuItem>
                                                <MenuItem value="Pines City Colleges">
                                                    Pines City Colleges
                                                </MenuItem>
                                                <MenuItem value="University of Baguio">
                                                    University of Baguio
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                wrap="nowrap"
                                xs={4}
                            >
                                <Grid item>
                                    <Typography variant="h5">
                                        Appointment:
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Date</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <DatePicker
                                                onChange={setDate}
                                                value={date}
                                                autoOk
                                                inputVariant="outlined"
                                                orientation="landscape"
                                                fullWidth
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Time</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <TimePicker
                                                onChange={setTime}
                                                value={time}
                                                autoOk
                                                inputVariant="outlined"
                                                orientation="landscape"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl
                                            id="status"
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <Select
                                                id="status"
                                                name="status"
                                                onChange={handleFilterSelect}
                                                value={filters.status}
                                            >
                                                <MenuItem value="canceled">
                                                    Canceled
                                                </MenuItem>
                                                <MenuItem value="completed">
                                                    Completed
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                wrap="nowrap"
                                xs={4}
                            >
                                <Grid item>
                                    <Typography variant="h5">
                                        Counselor:
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Last Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="clast_name"
                                            fullWidth
                                            name="clast_name"
                                            onChange={handleFilterSelect}
                                            value={filters.clast_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>First Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="cfirst_name"
                                            fullWidth
                                            name="cfirst_name"
                                            onChange={handleFilterSelect}
                                            value={filters.cfirst_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    wrap="nowrap"
                                    className={classes.grid_item}
                                >
                                    <Grid item xs={4}>
                                        <Typography>Middle Name</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="cmiddle_name"
                                            fullWidth
                                            name="cmiddle_name"
                                            onChange={handleFilterSelect}
                                            value={filters.cmiddle_name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.grid_item}
                        >
                            <Grid item>
                                <Button
                                    size="small"
                                    onClick={handleClearFilters}
                                    variant="outlined"
                                >
                                    Clear Filters
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    onClick={handleApplyFilters}
                                    size="small"
                                    variant="outlined"
                                >
                                    Apply Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </FiltersMenu>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    startIcon={<SaveAltIcon />}
                    onClick={handleOpenExportList}
                    className={classes.button}
                >
                    Export
                </Button>
                <StyledMenu
                    anchorEl={anchorToExportButton}
                    keepMounted
                    open={Boolean(anchorToExportButton)}
                    onClose={handleCloseExportList}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item className={classes.grid_item}>
                            <Button
                                color="primary"
                                disabled={exportLoading}
                                fullWidth
                                onClick={handleExportAsPDF}
                                size="large"
                                variant="outlined"
                            >
                                Export as PDF
                            </Button>
                        </Grid>
                        <Grid item className={classes.grid_item}>
                            <CSVLink data={csvRows} headers={csvHeaders}>
                                <Button
                                    color="primary"
                                    filename={"data.csv"}
                                    size="large"
                                    variant="outlined"
                                >
                                    Export as csv
                                </Button>
                            </CSVLink>
                        </Grid>
                    </Grid>
                </StyledMenu>
            </Grid>
        </Grid>
    );
};

const AppointmentPanel = ({
    date,
    profile,
    useStyles,
    loading,
    setLoading,
    appointments,
    setAppointments,
}) => {
    const classes = useStyles();

    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const appointmentHeaders = [
        {
            field: "student",
            headerName: "Student Name",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 200,
        },
        {
            field: "school",
            headerName: "School",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 400,
        },
        {
            field: "cdate",
            headerName: "Consultation Date",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 200,
        },
        {
            field: "time",
            headerName: "Consultation Time",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 200,
        },
        {
            field: "consulted",
            headerName: "Consulted By",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 200,
        },
        {
            field: "hei",
            headerName: "HEI",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 400,
        },
        {
            field: "status",
            headerName: "Status",
            headerClassName: `${classes.table_header}`,
            cellClassName: `${classes.table_cell}`,
            // flex: 0.1428571428571429,
            width: 200,
        },
    ];

    let appointmentRows = [];
    if (isFiltered) {
        filteredData.map((appointment, index) => {
            const date = new Date(appointment.date).toDateString();
            const time = format(new Date(appointment.time), "hh:mm aa");

            if (appointment.student && appointment.counselor) {
                appointmentRows.push({
                    id: index,
                    student: `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                    school: appointment.student.school,
                    cdate: date,
                    time: time,
                    consulted: `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                    hei: appointment.counselor.hei,
                    status: appointment.status,
                });
            }
        });
    } else {
        appointments.map((appointment, index) => {
            const date = new Date(appointment.date).toDateString();
            const time = format(new Date(appointment.time), "hh:mm aa");

            appointmentRows.push({
                id: index,
                student: `${appointment.student.last_name}, ${appointment.student.first_name} ${appointment.student.middle_name}`,
                school: appointment.student.school,
                cdate: date,
                time: time,
                consulted: `${appointment.counselor.last_name}, ${appointment.counselor.first_name} ${appointment.counselor.middle_name}`,
                hei: appointment.counselor.hei,
                status: appointment.status,
            });
        });
    }

    return (
        <TabPanel
            value="3"
            style={{
                height: 640,
            }}
        >
            <DataGrid
                rows={appointmentRows}
                columns={appointmentHeaders}
                components={{
                    Toolbar: CustomToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        idate: date,
                        profile: profile,
                        isFiltered: isFiltered,
                        setIsFiltered: setIsFiltered,
                        useStyles: useStyles,
                        setLoading: setLoading,
                        appointments: appointments,
                        setAppointments: setAppointments,
                        filteredData: filteredData,
                        setFilteredData: setFilteredData,
                    },
                }}
                disableColumnMenu
                disableSelectionOnClick
                loading={loading}
                rowsPerPageOptions={[20, 50, 100]}
            />
        </TabPanel>
    );
};

export default AppointmentPanel;
