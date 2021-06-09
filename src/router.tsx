import { BrowserRouter, Route, RouteProps, Switch, useLocation } from "react-router-dom";
import React, { useEffect, Fragment, useLayoutEffect } from "react";
import { AntiochPage } from "./antioch/antioch-page";

interface AntiochRoute extends RouteProps {
    title: string;
}

const AntiochRoute: React.FC<AntiochRoute> = props => {

    // All effects placed here will be executed on every route change

    useEffect(() => {
        document.title = `Nothing to see here | ${props.title}`;
    });

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const { title, ...rest } = props;
    return <Route exact {...rest} />;
};

export const routes = {
	antioch: "/antioch",
    home: "/",
};

export const AntiochRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <ScrollToTop/>
                <Switch>
					<AntiochRoute path={routes.antioch} title="Antioch" component={AntiochPage}/>
                    <AntiochRoute path={routes.home} title="Home" component={() => <h2>See? There's nothing here! Now go away!</h2>} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
