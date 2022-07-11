import React, { useState } from "react";
import classes from "./style.module.scss";
import {
    Button,
    ButtonBase,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { deepPurple } from "@mui/material/colors";
import { useGetSiteInfoQuery } from "services/api";
import Markdown from "components/Markdown";
import { useTranslation } from "react-i18next";

const AboutButton: React.FC = () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const theme = useTheme<Theme>();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { data: siteInfo, isLoading } = useGetSiteInfoQuery();

    return (
        <>
            <ButtonBase
                className={classes.buttonBase}
                onClick={() => {
                    setOpen(true);
                }}
            >
                <Paper className={classes.paper}>
                    <InfoRoundedIcon
                        className={classes.icon}
                        sx={{
                            color: deepPurple[600],
                        }}
                    />
                    <Typography variant={"h5"} className={classes.text} component={"span"}>
                        {t("关于")}
                    </Typography>
                </Paper>
            </ButtonBase>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={isMobile}
                fullWidth={!isMobile}
                keepMounted
            >
                <DialogTitle>{t("关于本站")}</DialogTitle>
                <DialogContent
                    sx={{
                        minHeight: isMobile ? undefined : 160,
                    }}
                >
                    {typeof siteInfo === "undefined" || isLoading ? (
                        <CircularProgress />
                    ) : (
                        <DialogContentText>
                            <Markdown>{siteInfo.about_info}</Markdown>
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("关闭")}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AboutButton;
