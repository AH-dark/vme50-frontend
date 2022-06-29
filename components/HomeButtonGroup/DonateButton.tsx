import React, { useState } from "react";
import classes from "./style.module.scss";
import {
    Avatar,
    Button,
    ButtonBase,
    Card,
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
import { useGetRandomDonateInfoQuery, useGetSiteInfoQuery } from "~/service/api";
import { getGravatar } from "~/utils/gravatar";
import dayjs from "dayjs";
import { QRCodeCanvas } from "qrcode.react";

const DonateButton: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [prevId, setPrevId] = useState(0);
    const { data, isLoading, refetch } = useGetRandomDonateInfoQuery(prevId);
    const { data: siteInfoData } = useGetSiteInfoQuery();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = () => {
        setPrevId(data?.ID || 0);
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
                        {"随机打赏"}
                    </Typography>
                </Paper>
            </ButtonBase>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={isMobile}
                fullWidth={!isMobile}
                className={classes.donateButtonDialog}
            >
                <DialogTitle>{"您找到了有缘人，快赞赏他吧"}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {isLoading || typeof data === "undefined" ? (
                        <CircularProgress />
                    ) : (
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={data?.name}
                                        src={getGravatar(
                                            siteInfoData?.gravatar_origin ||
                                                "www.gravatar.com/avatar/",
                                            data.email
                                        )}
                                        aria-label={"avatar"}
                                    />
                                }
                                title={data?.name}
                                subheader={`Uploaded on ${dayjs(data.CreatedAt).format(
                                    "YYYY/MM/DD HH:mm"
                                )}`}
                            />
                            <CardContent>
                                <Stack spacing={2} className={classes.pay}>
                                    <QRCodeCanvas value={data.url} />
                                    <Typography variant={"h6"} component={"span"}>
                                        {"请使用 " + data.payment + " 支付"}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{"关闭"}</Button>
                    <Button type={"reset"} onClick={handleRefresh}>
                        {"刷新"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DonateButton;
