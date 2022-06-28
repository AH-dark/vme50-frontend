import React, { useMemo } from "react";
import classes from "../style.module.scss";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useAppSelector } from "~/redux/hooks";
import { useGetSiteInfoQuery } from "~/service/api";

const Navbar: React.FC = () => {
    const { data: siteInfo } = useGetSiteInfoQuery();
    const viewTitle = useAppSelector((state) => state.viewUpdate.title);
    const title = useMemo(
        () => viewTitle || siteInfo?.site_name || "Random Donate",
        [siteInfo, viewTitle]
    );

    return (
        <AppBar position={"static"} className={classes.appbar}>
            <Toolbar>
                <IconButton size={"medium"} color={"inherit"}>
                    <HomeRoundedIcon />
                </IconButton>
                <Typography variant={"h6"} component={"span"} className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
