import React from "react";
import classes from "./style.module.scss";
import Layout from "components/Layout";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetDonateInfoQuery } from "../../services/api";
import { useTranslation } from "react-i18next";
import DonateCard from "../DonateCard";

const DonatePage: React.FC = () => {
    const { t } = useTranslation();

    const { id } = useParams<{ id: string }>();
    const { data } = useGetDonateInfoQuery(id);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Layout className={classes.root}>
            <Container maxWidth={"md"} className={classes.container}>
                <Typography
                    variant={isMobile ? "h4" : "h3"}
                    component={"h1"}
                    className={classes.title}
                >
                    {t("快给 {{name}} 打钱！", {
                        name: data?.name,
                    })}
                </Typography>
                {data && <DonateCard data={data} className={classes.card} />}
            </Container>
        </Layout>
    );
};

export default DonatePage;
