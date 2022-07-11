import React, { useEffect } from "react";
import classes from "./home.module.scss";
import Layout from "components/Layout";
import { Container, Typography } from "@mui/material";
import HomeButtonGroup from "./HomeButtonGroup";
import pangu from "pangu";
import { useAppDispatch } from "redux/hooks";
import { setTitle } from "redux/reducer/viewUpdate";
import { useGetSiteInfoQuery } from "services/api";
import clsx from "clsx";

const Homepage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, [dispatch]);

    const { data: siteInfo } = useGetSiteInfoQuery();

    return (
        <Layout className={classes.root}>
            <Container maxWidth={"lg"} className={clsx("home", classes.container)}>
                <Typography
                    variant={"h2"}
                    component={"h1"}
                    className={clsx("title", classes.title)}
                >
                    {pangu.spacing(siteInfo?.site_name || "")}
                </Typography>
                <HomeButtonGroup />
            </Container>
        </Layout>
    );
};

export default Homepage;
