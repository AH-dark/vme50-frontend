import React, { useCallback, useMemo, useState } from "react";
import classes from "./style.module.scss";
import {
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { blue } from "@mui/material/colors";
import type DonateInfoRequest from "~/model/request/donateInfoRequest";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { usePostDonateInfoMutation } from "~/service/api";
import { AxiosError } from "axios";
import ResponseData from "~/model/response/responseData";
import DonateInfoResponse from "~/model/response/donateInfoResponse";
import { useTranslation } from "react-i18next";

const accept = [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".webp"];

const initData: DonateInfoRequest = {
    name: "",
    email: "",
    payment: "alipay",
    qrcode: null,
};

const UploadButton: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [postDonateInfo, { isLoading: isPosting }] = usePostDonateInfoMutation();

    const [open, setOpen] = useState(false);
    const theme = useTheme<Theme>();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [data, setData] = useState<DonateInfoRequest>(initData);
    const fileUrl = useMemo<string>(() => {
        return data.qrcode !== null ? URL.createObjectURL(data.qrcode) : "";
    }, [data.qrcode]);

    /* useEffect(() => {
     // test
     console.log(data);
     }, [data]); */

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        setData(initData);
    };

    const onDrop = useCallback(
        (files: File[]) => {
            setData({
                ...data,
                qrcode: files[0],
            });
        },
        [data]
    );

    const handleSubmit = () => {
        // check data
        if (data.name === "" || data.email === "" || data.qrcode === null) {
            enqueueSnackbar(t("参数不完整，请检查", { ns: "api" }), {
                variant: "warning",
            });
            return;
        } else if (
            !RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$").test(data.email)
        ) {
            enqueueSnackbar(t("邮箱格式不合法，请检查", { ns: "api" }), {
                variant: "warning",
            });
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("payment", data.payment);
        formData.append("qrcode", data.qrcode);

        // api post
        postDonateInfo(formData)
            .unwrap()
            .then((r) => {
                console.log(r);
                enqueueSnackbar(t("上传成功", { ns: "api" }), {
                    variant: "success",
                });
                handleClose();
            })
            .catch((err) => {
                const error = err as AxiosError<ResponseData<DonateInfoResponse>>;
                console.error(error);
                enqueueSnackbar(error.response?.data.message || error.message, {
                    variant: "error",
                });
            });
    };

    const {
        getRootProps,
        getInputProps,
        inputRef,
        open: openUploadWindow,
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": accept,
        },
        maxSize: 1048576,
        maxFiles: 1,
        noClick: true,
        multiple: false,
        onError(err) {
            console.error(err);
            enqueueSnackbar(t("上传失败", { ns: "api" }), {
                variant: "error",
            });
        },
    });

    return (
        <>
            <ButtonBase className={classes.buttonBase} onClick={handleClick}>
                <Paper className={classes.paper}>
                    <UploadRoundedIcon
                        className={classes.icon}
                        sx={{
                            color: blue[600],
                        }}
                    />
                    <Typography variant={"h5"} className={classes.text} component={"span"}>
                        {t("上传")}
                    </Typography>
                </Paper>
            </ButtonBase>
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.uploadButtonDialog}
                fullWidth={!isMobile}
                fullScreen={isMobile}
            >
                <DialogTitle>{t("上传收款码")}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} component={"form"} className={classes.form}>
                        <TextField
                            variant={"standard"}
                            label={t("昵称")}
                            value={data.name}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    name: e.target.value,
                                });
                            }}
                            autoComplete={"name"}
                            type={"text"}
                            required
                        />
                        <TextField
                            variant={"standard"}
                            label={t("邮箱")}
                            value={data.email}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    email: e.target.value,
                                });
                            }}
                            autoComplete={"email"}
                            type={"email"}
                            error={
                                data.email !== "" &&
                                !RegExp(
                                    "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
                                ).test(data.email)
                            }
                            helperText={t("Gravatar 头像会使用邮箱地址生成")}
                            required
                        />
                        <FormControl sx={{ pt: 1 }}>
                            <FormLabel>{t("收款方式")}</FormLabel>
                            <RadioGroup
                                row
                                name="payment"
                                value={data.payment}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        payment: e.target.value,
                                    });
                                }}
                            >
                                {["alipay", "wechat"].map((payment) => (
                                    <FormControlLabel
                                        key={payment}
                                        value={payment}
                                        control={<Radio />}
                                        label={t(payment, { ns: "payment" })}
                                    />
                                ))}
                            </RadioGroup>
                            <FormControl sx={{ pt: 1 }}>
                                <FormLabel>{t("上传收款码")}</FormLabel>
                                <Box {...getRootProps()} className={classes.uploader}>
                                    <input
                                        {...getInputProps()}
                                        className={classes.input}
                                        type={"file"}
                                        accept={accept.join(",")}
                                        ref={inputRef}
                                    />
                                    <ButtonBase
                                        className={classes.button}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openUploadWindow();
                                        }}
                                    >
                                        <Stack spacing={1} className={classes.infoPart}>
                                            {data.qrcode === null ? (
                                                <>
                                                    <UploadFileRoundedIcon />
                                                    <Typography
                                                        variant={"subtitle2"}
                                                        component={"span"}
                                                    >
                                                        {t("拖动文件至此或点击上传图片")}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Box
                                                    component={"img"}
                                                    src={fileUrl}
                                                    height={"100%"}
                                                    paddingY={2}
                                                />
                                            )}
                                        </Stack>
                                    </ButtonBase>
                                </Box>
                                <FormHelperText sx={{ mx: 0.5 }}>
                                    {t("请上传有效的清晰地且与上方所选收款方式匹配的二维码")}
                                </FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Stack>
                </DialogContent>
                {isMobile ? (
                    <DialogActions className={classes.actions}>
                        <Button onClick={handleReset} type={"reset"}>
                            {t("重置")}
                        </Button>
                        <Box>
                            <Button onClick={handleClose}>{"关闭"}</Button>
                            <Button onClick={handleSubmit} type={"submit"}>
                                {t("提交")}
                            </Button>
                        </Box>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        <Button onClick={handleClose}>{t("关闭")}</Button>
                        <Button onClick={handleReset} type={"reset"}>
                            {t("重置")}
                        </Button>
                        <LoadingButton onClick={handleSubmit} type={"submit"} loading={isPosting}>
                            {t("提交")}
                        </LoadingButton>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
};

export default UploadButton;
