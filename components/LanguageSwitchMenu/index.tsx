import React, { useMemo } from "react";
import classes from "./menuStyles.module.scss";
import { Fab, Menu, MenuItem, PopoverOrigin, useMediaQuery, useTheme } from "@mui/material";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { useTranslation } from "react-i18next";
import { getLanguageName } from "~/i18n";
import { useSnackbar } from "notistack";
import clsx from "clsx";

const origin: PopoverOrigin = {
    vertical: "bottom",
    horizontal: "right",
};

const LanguageSwitchMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { t, i18n } = useTranslation();
    const languages = useMemo<string[]>(() => {
        if (
            i18n.options.supportedLngs === false ||
            typeof i18n.options.supportedLngs === "undefined"
        ) {
            return [];
        }

        const arr: string[] = Array.from(i18n.options.supportedLngs);
        while (arr.indexOf("cimode") !== -1) {
            arr.splice(arr.indexOf("cimode"), 1);
        }

        return arr;
    }, []);

    return (
        <>
            <Fab
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
                color={"primary"}
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                size={isMobile ? "medium" : "large"}
            >
                <LanguageRoundedIcon />
            </Fab>
            {languages && (
                <Menu
                    open={anchorEl !== null}
                    anchorEl={anchorEl}
                    onClose={() => {
                        setAnchorEl(null);
                    }}
                    anchorOrigin={origin}
                    transformOrigin={origin}
                    className={classes.root}
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    {languages.map((lang) => (
                        <MenuItem
                            onClick={() => {
                                i18n.changeLanguage(lang).then((r) => {
                                    enqueueSnackbar(
                                        t("已切换语言至 {{lang}}", {
                                            lang: getLanguageName(lang),
                                        }),
                                        {
                                            variant: "success",
                                        }
                                    );
                                });
                                setAnchorEl(null);
                            }}
                            selected={lang in i18n.languages}
                            key={lang}
                        >
                            <span
                                className={clsx(
                                    classes.flag,
                                    "fi",
                                    "fi-" + lang.split("-")[1].toLowerCase()
                                )}
                            />
                            {getLanguageName(lang)}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    );
};

export default LanguageSwitchMenu;
