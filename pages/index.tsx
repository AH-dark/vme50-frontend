import type { NextPage } from "next";
import classes from "~/styles/home.module.scss";
import { useAppDispatch } from "~/redux/hooks";
import { useEffect } from "react";
import { setTitle } from "~/redux/reducer/viewUpdate";
import Layout from "~/components/Layout";
import { Container, Typography } from "@mui/material";
import HomeButtonGroup from "~/components/HomeButtonGroup";
import { useGetSiteInfoQuery } from "~/service/api";
import pangu from "pangu";

const Home: NextPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, [dispatch]);

    const { data: siteInfo } = useGetSiteInfoQuery();

    return (
        <Layout className={classes.root}>
            <Container maxWidth={"lg"} className={classes.container}>
                <Typography variant={"h2"} component={"h1"} className={classes.title}>
                    {pangu.spacing(siteInfo?.site_name || "")}
                </Typography>
                <HomeButtonGroup />
            </Container>
        </Layout>
    );
};

export default Home;
