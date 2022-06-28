import React from "react";
import classes from "./style.module.scss";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import clsx from "clsx";

const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
    return (
        <Box className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={clsx(classes.main, className)}>{children}</main>
        </Box>
    );
};

export default Layout;
