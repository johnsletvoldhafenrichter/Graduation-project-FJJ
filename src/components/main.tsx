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


import {DinSide} from "./dinside";
import {Profile} from './profil';
import {logoutfunction} from "./login/logoutfunction";
import {Kursoversikt} from "./kursoversikt";
import {Kurs} from "./kurs";
import {Filter} from "./filter";

export default class Main extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            trayState: null,
        }
    }

    changeTray(trayName: string, event: any): void {
        this.setState({
            //@ts-ignore
            trayState: <Filter closeFunction={this.closeTray.bind(this)} />
        })

    }

    closeTray(): void {
        this.setState({
            trayState: null,
        })
    }

    render() {
        //@ts-ignore
        let tray = this.state.trayState
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
                                text="Filter"
                                onClick={(event: any) => this.changeTray('filter', event)}/>
                        </>
                    }
                    headerText="Min side"
                    navbarSections=
                        {
                            <>
                                <NavbarSection>
                                    <NavbarButton
                                        icon="AdminHome"
                                        text="Min side"
                                        as={Link}
                                        to="/dinside"/>
                                    <NavbarButton
                                        icon="UserPlans"
                                        text="Mine kurs"
                                        as={Link}
                                        to="/mycourses"
                                    />
                                    <NavbarButton
                                        icon="Learn"
                                        text="Kursoversikt"
                                        as={Link}
                                        to="/courses"/>
                                    <NavbarButton
                                        icon="User"
                                        text="Profil"
                                        as={Link}
                                        to="/profile"/>
                                    <NavbarButton
                                        onClick={() => logoutfunction()}
                                        icon="Logout"
                                        text="Logg ut"/>
                                </NavbarSection>
                            </>
                        }
                    pageType="user"
                    tray={tray}
                    isMainPage>
                    <div className="App ds-typography-body">
                        <Switch>
                            <Route path="/dinside"
                                   render={(props) => (
                                       <DinSide {...props}/>
                                   )}>
                            </Route>
                            <Route path='/profile'
                                   render={(props) => (
                                       <Profile {...props}/>
                                   )}>
                            </Route>
                            <Route
                                path='/courses'
                                render={(props) => (
                                    <Kursoversikt {...props}/>
                                )}>
                            </Route>
                            <Route
                                path='/coursedetails/:id'
                                render={(props) => (
                                    <Kurs {...props}/>
                                )}>
                            </Route>
                        </Switch>
                    </div>
                </ApplicationLayout>
            </Router>
        )
    }
}