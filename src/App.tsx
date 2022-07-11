import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetSiteInfoQuery } from "services/api";
import { useAppSelector } from "redux/hooks";
import { Route, Switch } from "react-router-dom";
import Home from "components/Home";

const App: React.FC = () => {
    const { t } = useTranslation("title");
    const { data: siteInfo } = useGetSiteInfoQuery();

    const siteName = useMemo(() => {
        return siteInfo?.site_name || "Random Donate";
    }, [siteInfo]);
    const viewTitle = useAppSelector((state) => state.viewUpdate.title);
    window.document.title = useMemo<string>(
        () => (viewTitle === null ? siteName : `${t(viewTitle)} - ${siteName}`),
        [viewTitle, siteName, t]
    );

    return (
        <Switch>
            <Route path={"/"} exact>
                <Home />
            </Route>
        </Switch>
    );
};

export default App;
