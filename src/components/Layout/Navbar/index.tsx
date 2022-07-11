import React, { useMemo } from "react";
import classes from "../style.module.scss";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useAppSelector } from "redux/hooks";
import { useGetSiteInfoQuery } from "services/api";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Navbar: React.FC = () => {
    const { data: siteInfo } = useGetSiteInfoQuery();
    const { t } = useTranslation();
    const history = useHistory();

    const viewTitle = useAppSelector((state) => state.viewUpdate.title);
    const title = useMemo(() => {
        if (viewTitle !== null) {
            return t(viewTitle, { ns: "title" });
        } else {
            return siteInfo?.site_name || "Random Donate";
        }
    }, [siteInfo, viewTitle, t]);

    const handleClick: React.MouseEventHandler = (e) => {
        e.preventDefault();
        history.push("/");
    };

    return (
        <AppBar position={"fixed"} color={"default"} className={classes.appbar}>
            <Toolbar>
                <IconButton size={"medium"} color={"inherit"} onClick={handleClick}>
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
