import React from "react";
import classes from "./style.module.scss";
import { ButtonBase, Paper, Typography } from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { blue } from "@mui/material/colors";

const UploadButton: React.FC = () => {
    return (
        <ButtonBase className={classes.buttonBase}>
            <Paper className={classes.paper}>
                <UploadRoundedIcon
                    className={classes.icon}
                    sx={{
                        color: blue[600],
                    }}
                />
                <Typography variant={"h5"} className={classes.text} component={"span"}>
                    {"上传"}
                </Typography>
            </Paper>
        </ButtonBase>
    );
};

export default UploadButton;
