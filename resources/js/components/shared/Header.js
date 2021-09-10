import React from "react";
import {
    AppBar,
    Toolbar,
    Container,
    Grid,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { CustomButton } from "../../material-ui/styles";
import projectok_logo from "../../../images/projectok_logo.svg";

const useStyle = makeStyles((theme) => ({
    logo: {
        "&:hover": {
            textDecoration: "none",
        },
    },
    title: {
        "&:after": {
            color: theme.palette.secondary.main,
            content: "'Kumustahan'",
        },
    },
    link: {
        "&:hover": {
            color: theme.palette.secondary.main,
        },
    },
    link_route: {
        color: theme.palette.common.black,
        "&:hover": {
            textDecoration: "none",
            color: theme.palette.primary.dark,
        },
    },
    gridItem: {
        padding: "0 4px",
    },
}));

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        width: "240px",
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

const Logo = () => {
    const auth = useAuth();
    let location;

    if (auth.user.isLoggedIn && auth.user.type === "ched") {
        location = {
            pathname: "/ched/admin",
        };
    } else if (auth.user.isLoggedIn && auth.user.type === "school") {
        location = {
            pathname: "/school",
        };
    } else {
        location = {
            pathname: "/",
        };
    }

    const classes = useStyle();

    return (
        <Grid item>
            <Link to={location} className={classes.logo}>
                <IconButton disableFocusRipple={true} disableRipple={true}>
                    <img src={projectok_logo} alt="Project-OK Logo" />
                    <Typography
                        color="primary"
                        variant="h4"
                        className={classes.title}
                    >
                        Online
                    </Typography>
                </IconButton>
            </Link>
        </Grid>
    );
};

const LoginRegisterButtons = () => {
    const classes = useStyle();

    return (
        <Grid
            container
            item
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
        >
            <Grid item className={classes.gridItem}>
                <Link
                    to={{
                        pathname: `/ched/admin/create`,
                        state: {
                            background: {
                                pathname: "/",
                            },
                        },
                    }}
                    className={classes.link_route}
                >
                    <CustomButton radius="32px">Register</CustomButton>
                </Link>
            </Grid>
            <Grid item className={classes.gridItem}>
                <Link
                    to={{
                        pathname: `/login`,
                        state: {
                            background: {
                                pathname: "/",
                            },
                        },
                    }}
                    className={classes.link_route}
                >
                    <CustomButton background="primary" radius="32px">
                        Log in
                    </CustomButton>
                </Link>
            </Grid>
        </Grid>
    );
};

const AccountButton = ({ auth, _id, name, type }) => {
    let history = useHistory();

    const classes = useStyle();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        let response = await auth.logout();
        switch (response.status) {
            case 200:
                history.push("/");
                break;
        }
    };

    let menuItems;
    if (type === "ched") {
        menuItems = (
            <StyledMenu
                id="menu-items"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout} data-name="logout">
                    Log out
                </MenuItem>
            </StyledMenu>
        );
    } else if (type === "college") {
        menuItems = (
            <StyledMenu
                id="menu-items"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} data-name="profile">
                    <Link
                        to={`/school/admin${_id}`}
                        className={classes.link_route}
                    >
                        My Account
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    data-name="logout"
                    className={classes.link_route}
                >
                    Log out
                </MenuItem>
            </StyledMenu>
        );
    }

    return (
        <Grid container item direction="row" justifyContent="flex-end">
            <Grid item>
                <CustomButton
                    aria-controls="menu-items"
                    aria-haspopup="true"
                    onClick={handleClick}
                    startIcon={<AccountCircle fontSize="large" />}
                    background="primary"
                >
                    {name ? `${name}` : ""}
                </CustomButton>
            </Grid>
            <Grid item>{menuItems}</Grid>
        </Grid>
    );
};

const Header = ({ _name }) => {
    const auth = useAuth();

    let headerItems;
    if (auth.user.isLoggedIn) {
        headerItems = (
            <AccountButton
                auth={auth}
                _id={`${auth.user.data._id}`}
                name={_name}
                type={auth.user.data.type}
            />
        );
    } else {
        headerItems = <LoginRegisterButtons />;
    }

    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar disableGutters={true}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Logo />
                        {headerItems}
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
