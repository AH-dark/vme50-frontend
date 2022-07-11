import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import styles from "./style.module.scss";
import dayjs from "dayjs";
import { QRCodeCanvas } from "qrcode.react";
import DonateInfo from "model/base/donateInfo";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import pangu from "pangu";

interface DonateCardProps extends React.ComponentProps<"div"> {
    data: DonateInfo;
}

const DonateCard: React.FC<DonateCardProps> = ({ className, data }) => {
    const { t, i18n } = useTranslation();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Card className={clsx(className, styles.root)}>
            <CardHeader
                avatar={
                    <Avatar alt={data?.name} aria-label={"avatar"}>
                        {data?.name[0]}
                    </Avatar>
                }
                title={data?.name}
                subheader={t(`Uploaded on {{date}}`, {
                    date: dayjs(data.CreatedAt).locale(i18n.language).format("YYYY-MM-DD HH:mm:ss"),
                })}
            />
            <Divider />
            {data.comment.length > 0 && (
                <>
                    <CardContent>
                        <b>{t("留言：")}</b>
                        {pangu.spacing(data.comment)}
                    </CardContent>
                    <Divider />
                </>
            )}
            <CardContent>
                <Stack spacing={2} className={styles.pay}>
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
    );
};

export default DonateCard;
