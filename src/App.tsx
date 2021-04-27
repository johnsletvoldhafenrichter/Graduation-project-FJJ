import React from 'react';
import './css/App.css';
import "@dossier/mithra-ui/dist/ds.css"
import {
    ApplicationLayout,
    PageHeaderButton,
    NavbarSection,
    NavbarButton,
} from "@dossier/mithra-ui";

function App() {
    return (
        <div className="App ds-typography-body">
            <ApplicationLayout
                backButtonTitle="Back to plans"
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
                navbarSections={
                    <>
                        <NavbarSection>
                            {/*<NavbarButton*/}
                            {/*    as={NavLink}*/}
                            {/*    exact icon="UserHome"*/}
                            {/*    text="Home"*/}
                            {/*    to="/Navbar"/>*/}
                            <NavbarButton
                                icon="AdminHome"
                                text="Min side"/>
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
                tray={null}
             isMainPage>
            </ApplicationLayout>
        </div>
    );
}

export default App;
