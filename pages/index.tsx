import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch } from "~/redux/hooks";
import { useEffect } from "react";
import { setTitle } from "~/redux/reducer/viewUpdate";

const Home: NextPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Home - Random Donate</title>
            </Head>
            Hello
        </>
    );
};

export default Home;
