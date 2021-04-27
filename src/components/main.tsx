import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "@dossier/mithra-ui/dist/ds.css"
import {
    ApplicationLayout,
    PageHeaderButton,
    NavbarSection,
    NavbarButton,
} from "@dossier/mithra-ui";

export default class Main extends React.Component {
    render() {
        return (
            <Router>
                <ApplicationLayout
                    headerButtons={
                        <>
                            <PageHeaderButton
                                icon="Search"
                                text="Søk"/>
                            <PageHeaderButton
                                icon="Filter"
                                text="Filter"/>
                        </>
                    }
                    headerText="Min side"
                    navbarSections=
                        {
                            <>
                                <NavbarSection>
                                    {/*<NavbarButton*/}
                                    {/*    as={NavLink}*/}
                                    {/*    exact icon="UserHome"*/}
                                    {/*    text="Home"*/}
                                    {/*    to="/Navbar"/>*/}
                                    <NavbarButton
                                        icon="AdminHome"
                                        text="Min side"
                                        as={Link}
                                        to="/dinside"/>
                                    <NavbarButton
                                        icon="UserPlans"
                                        text="Mine kurs"/>
                                    <NavbarButton
                                        icon="Learn"
                                        text="Kursoversikt"/>
                                    <NavbarButton
                                        icon="User"
                                        text="Profil"/>
                                    <NavbarButton
                                        icon="Logout"
                                        text="Logg ut"/>
                                </NavbarSection>
                            </>
                        }
                    pageType="user"
                    tray=
                        {
                            null
                        }
                    isMainPage>
                    <div className="App ds-typography-body">
                        <Switch>
                            <Route path="/dinside">
                                <div>Hei dette er din side!</div>
                            </Route>
                            <Route path="/logout">
                                <div>Trykk her for å logge ut!</div>
                            </Route>
                        </Switch>
                    </div>
                </ApplicationLayout>
            </Router>
        )
    }
}