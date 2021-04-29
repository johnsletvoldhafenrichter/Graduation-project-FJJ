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


import {Dinsideauth} from "./dinside/dinsideauth";
import {Profileauth} from './profil/porfileauth';
import {logoutfunction} from "./login/logoutfunction";
import {Kursoversiktauth} from "./kursoversikt/kursoversiktauth";
import {Kurs} from "./kurs/kurs";

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
                  <NavbarButton
                    icon="AdminHome"
                    text="Min side"
                    as={Link}
                    to="/dinside"/>
                  <NavbarButton
                    icon="UserPlans"
                    text="Mine kurs"
                    as={Link}
                    to="/course"/>
                  <NavbarButton
                    icon="Learn"
                    text="Kursoversikt"
                    as={Link}
                    to="/kursoversikt"/>
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
                <Dinsideauth/>
              </Route>
              <Route path="/profile">
                <Profileauth/>
              </Route>
              <Route path="/kursoversikt">
                <Kursoversiktauth/>
              </Route>
            </Switch>
          </div>
        </ApplicationLayout>
      </Router>
    )
  }
}