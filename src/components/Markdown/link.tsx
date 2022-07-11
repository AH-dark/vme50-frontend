import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    if (props.href && (props.href.startsWith(".") || props.href.startsWith("/"))) {
        return <RouteLink to={props.href}>{props.children}</RouteLink>;
    }

    return <MuiLink href={props.href}>{props.children}</MuiLink>;
};

export default Link;
