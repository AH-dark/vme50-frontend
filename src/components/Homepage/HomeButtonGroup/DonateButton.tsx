import React, { useMemo, useState } from "react";
import classes from "./style.module.scss";
import {
    Button,
    ButtonBase,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { green } from "@mui/material/colors";
import { useGetDonateInfoQuery, useGetRandomDonateHashQuery } from "services/api";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import DonateCard from "components/DonateCard";
import { useHistory } from "react-router-dom";

const DonateButton: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const { data: hash, isLoading: isGettingHash, refetch } = useGetRandomDonateHashQuery();
    const { data, isLoading: isGettingInfo } = useGetDonateInfoQuery(hash || "");
    const isLoading = useMemo<boolean>(
        () => isGettingHash || isGettingInfo,
        [isGettingHash, isGettingInfo]
    );

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = () => {
        refetch();
    };

    const handleDetail = () => {
        history.push("/donate/" + hash);
    };

    const theme = useTheme<Theme>();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <ButtonBase
                className={clsx("donateButton", classes.buttonBase)}
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                <Paper className={classes.paper}>
                    <AttachMoneyRoundedIcon
                        className={classes.icon}
                        sx={{
                            color: green[700],
                        }}
                    />
                    <Typography variant={"h5"} className={classes.text} component={"span"}>
                        {t("随机打赏")}
                    </Typography>
                </Paper>
            </ButtonBase>
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.donateButtonDialog}
                fullScreen={isMobile}
                fullWidth={!isMobile}
                keepMounted
            >
                <DialogTitle>{t("快V他50吧")}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {isLoading || typeof data === "undefined" ? (
                        <CircularProgress />
                    ) : (
                        <DonateCard data={data} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("关闭")}</Button>
                    <Button onClick={handleDetail}>{t("查看详情")}</Button>
                    <Button onClick={handleRefresh}>{t("刷新")}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DonateButton;
