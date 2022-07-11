import React, { useState } from "react";
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
    Paper,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { green } from "@mui/material/colors";
import { useGetRandomDonateInfoQuery } from "services/api";
import dayjs from "dayjs";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";

const DonateButton: React.FC = () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const { data, isLoading, refetch } = useGetRandomDonateInfoQuery();

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
                className={classes.buttonBase}
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
                <DialogTitle>{t("您找到了有缘人，快赞赏他吧")}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {isLoading || typeof data === "undefined" ? (
                        <CircularProgress />
                    ) : (
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={<Avatar alt={data?.name} aria-label={"avatar"} />}
                                title={data?.name}
                                subheader={`Uploaded on ${dayjs(data.CreatedAt).format(
                                    "YYYY/MM/DD HH:mm"
                                )}`}
                            />
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
