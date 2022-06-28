import React from "react";
import classes from "./style.module.scss";
import { Grid } from "@mui/material";
import UploadButton from "./UploadButton";
import DonateButton from "./DonateButton";
import AboutButton from "./AboutButton";

const HomeButtonGroup: React.FC = () => {
    return (
        <Grid
            container
            className={classes.root}
            spacing={2}
            columns={{
                sx: 4,
                sm: 12,
            }}
        >
            <Grid item xs={4} className={classes.gridItem}>
                <UploadButton />
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <DonateButton />
            </Grid>
            <Grid item xs={4} className={classes.gridItem}>
                <AboutButton />
            </Grid>
        </Grid>
    );
};

export default HomeButtonGroup;
