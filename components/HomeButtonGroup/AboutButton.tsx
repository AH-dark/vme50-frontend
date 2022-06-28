import React from "react";
import classes from "./style.module.scss";
import { ButtonBase, Paper, Typography } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { deepPurple } from "@mui/material/colors";

const AboutButton: React.FC = () => {
    return (
        <ButtonBase className={classes.buttonBase}>
            <Paper className={classes.paper}>
                <InfoRoundedIcon
                    className={classes.icon}
                    sx={{
                        color: deepPurple[600],
                    }}
                />
                <Typography variant={"h5"} className={classes.text} component={"span"}>
                    {"关于"}
                </Typography>
            </Paper>
        </ButtonBase>
    );
};

export default AboutButton;
