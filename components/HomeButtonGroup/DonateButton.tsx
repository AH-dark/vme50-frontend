import React from "react";
import classes from "./style.module.scss";
import { ButtonBase, Paper, Typography } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { green } from "@mui/material/colors";

const DonateButton: React.FC = () => {
    return (
        <ButtonBase className={classes.buttonBase}>
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
    );
};

export default DonateButton;
