import React, { useMemo, useState } from "react";
import classes from "./style.module.scss";
import {
    Avatar,
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { green } from "@mui/material/colors";
import { useGetDonateInfoQuery, useGetRandomDonateHashQuery } from "services/api";
import dayjs from "dayjs";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const DonateButton: React.FC = () => {
    const { t, i18n } = useTranslation();

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
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar alt={data?.name} aria-label={"avatar"}>
                                        {data?.name[0]}
                                    </Avatar>
                                }
                                title={data?.name}
                                subheader={t(`Uploaded on {{date}}`, {
                                    date: dayjs(data.CreatedAt)
                                        .locale(i18n.language)
                                        .format("YYYY-MM-DD HH:mm:ss"),
                                })}
                            />
                            <Divider />
                            {data.comment.length > 0 && (
                                <>
                                    <CardContent>{data.comment}</CardContent>
                                    <Divider />
                                </>
                            )}
                            <CardContent>
                                <Stack spacing={2} className={classes.pay}>
                                    <QRCodeCanvas value={data.url} />
                                    <Typography variant={"h6"} component={"span"}>
                                        {t("请使用 {{payment}} 支付", {
                                            payment: t(data.payment, { ns: "payment" }),
                                        })}
                                    </Typography>
                                </Stack>
                            </CardContent>
                            {isMobile && (
                                <CardActions>
                                    <Button
                                        href={data.url}
                                        target={"_blank"}
                                        fullWidth
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(data.url);
                                        }}
                                    >
                                        {t("捐赠")}
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("关闭")}</Button>
                    <Button type={"reset"} onClick={handleRefresh}>
                        {t("刷新")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DonateButton;
