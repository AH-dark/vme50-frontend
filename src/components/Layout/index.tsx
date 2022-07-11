import React from "react";
import classes from "./style.module.scss";
import { Box, CssBaseline } from "@mui/material";
import clsx from "clsx";
import LanguageSwitchMenu from "./LanguageSwitchMenu";

const Layout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
    return (
        <Box className={classes.root}>
            <CssBaseline />
            {/* 由于傻逼甲方的要求，去掉了：<Navbar /> */}
            <main className={clsx(classes.main, className)}>{children}</main>
            <LanguageSwitchMenu />
        </Box>
    );
};

export default Layout;
