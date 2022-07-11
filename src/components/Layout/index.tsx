import React from "react";
import classes from "./style.module.scss";
import { Box, CssBaseline } from "@mui/material";
import clsx from "clsx";
import LanguageSwitchMenu from "./LanguageSwitchMenu";
import Navbar from "./Navbar";

const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
    return (
        <Box className={clsx("layout-root", classes.root)}>
            <CssBaseline />
            <Navbar />
            <main className={clsx(classes.main, className)}>{children}</main>
            <LanguageSwitchMenu />
        </Box>
    );
};

export default Layout;
