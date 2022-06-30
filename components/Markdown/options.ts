import { MarkdownToJSX } from "markdown-to-jsx";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const options: MarkdownToJSX.Options = {
    overrides: {
        div: {
            component: Box,
        },
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "h4",
                component: "h1",
            },
        },
        h2: {
            component: Typography,
            props: { gutterBottom: true, variant: "h5", component: "h2" },
        },
        h3: {
            component: Typography,
            props: { gutterBottom: true, variant: "h6", component: "h3" },
        },
        h4: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: "subtitle1",
                component: "h4",
            },
        },
        p: {
            component: Typography,
            props: { paragraph: true },
        },
        a: { component: Link },
    },
};

export default options;
