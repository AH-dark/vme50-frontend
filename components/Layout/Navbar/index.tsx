import React, { useMemo } from "react";
import classes from "../style.module.scss";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useAppSelector } from "~/redux/hooks";
import { useGetSiteInfoQuery } from "~/service/api";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
    const { data: siteInfo } = useGetSiteInfoQuery();
    const { t } = useTranslation();

    const viewTitle = useAppSelector((state) => state.viewUpdate.title);
    const title = useMemo(() => {
        if (viewTitle !== null) {
            return t(viewTitle, { ns: "title" });
        } else {
            return siteInfo?.site_name || "Random Donate";
        }
    }, [siteInfo, viewTitle]);

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
