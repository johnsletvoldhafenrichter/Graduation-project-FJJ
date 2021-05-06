import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    ApplicationLayout,
    PageHeaderButton,
    NavbarSection,
    NavbarButton,
    Input,
} from "@dossier/mithra-ui";


import {DinSide} from "./dinside";
import {Profile} from './profil';
import {logoutfunction} from "./login/logoutfunction";
import {Kursoversikt} from "./kursoversikt";
import {Kurs} from "./kurs";
import {Filter} from "./filter";
import {MineKurs} from './mineKurs';
import {getAllCourses} from "../functions/kursoversiktFunction";

interface IProps {
}

interface MainState {
    trayState: any;
    searching: boolean;
    searchField: string;
    courses: [];
    searchValues: null | [];
    myCourses: [];
    searchParam: string;
    mainCourses: [];
    filtering: boolean;
    error?: any;
}

export default class Main extends React.Component<IProps, MainState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            trayState: null,
            searching: false,
            searchField: '',
            courses: [],
            searchValues: [],
            myCourses: [],
            searchParam: '',
            mainCourses: [],
            filtering: false,
            error: '',          
            siteHeader: ''
        }
    }

    async componentDidMount() {
        try {
            const courses = await getAllCourses();
            if (!courses) {
                this.setState({
                    error: 'Could not find courses!'
                })
                return;
            }
            this.setState({courses});
        } catch (error) {
            this.setState({
                error: 'Something went wrong!'
            })
            return;
        }
    }

    changeTray(trayName: string, event: any): void {
        if (!this.state.trayState) {
            this.setState({
                trayState: <Filter filtering={true} closeFunction={this.closeTray.bind(this)}
                                   setFilteringState={this.setFilteringState.bind(this)}
                                   setMyCourses={this.setMyCourses.bind(this)} setCourses={this.setCourses.bind(this)}
                                   setMainCourses={this.setMainCourses.bind(this)}/>
            })
            return;
        } else {
            this.setState({
                trayState: null,
            })
        }
    }

    closeTray(): void {
        this.setState({
            trayState: null,
        })
    }

    handleSearch() {
        this.setState({searching: !this.state.searching, searchValues: []})
    }

    handleChangeSearch(event: { target: any }) {
        this.setState({searchField: event.target.value})
        this.checkForResultsSearch(this.state.searchParam)
    }

    async checkForResultsSearch(str: any) {
        if (str === 'courses') {
            const currentString = this.state.searchField
            let courses = this.state.courses.slice()
            let searchValues: null | [] = [];
            for (let i = 0; i < courses.length; i++) {
                //@ts-ignore
                if (courses[i].course_name.toLowerCase().includes(currentString)) {
                    searchValues.push(courses[i])
                }
            }
            if (searchValues.length < 1) {
                searchValues = null;
            }
            await this.setState({searchValues})
        } else if (str === 'myCourses') {
            const currentString = this.state.searchField
            let courses = this.state.myCourses.slice()
            let searchValues: null | [] = [];
            for (let i = 0; i < courses.length; i++) {
                //@ts-ignore
                if (courses[i].course_name.toLowerCase().includes(currentString)) {
                    searchValues.push(courses[i])
                }
            }
            if (searchValues.length < 1) {
                searchValues = null;
            }
            await this.setState({searchValues})
        } else if (str === 'mainCourses') {
            const currentString = this.state.searchField
            let courses = this.state.mainCourses.slice()
            let searchValues: null | [] = [];
            for (let i = 0; i < courses.length; i++) {
                //@ts-ignore
                if (courses[i].course_name.toLowerCase().includes(currentString)) {
                    searchValues.push(courses[i])
                }
            }
            if (searchValues.length < 1) {
                searchValues = null;
            }
            await this.setState({searchValues})
        }
    }

    setMyCourses(courses: any) {
        this.setState({myCourses: courses})
    }

    setMainCourses(courses: any) {
        this.setState({mainCourses: courses})
    }

    setCourses(courses: any) {
        this.setState({courses: courses})
    }

    async closeSearch(str: string) {
        this.setState({searching: false, searchValues: []})
        switch (str) {
            case 'dinSide': {
                this.setState({searchParam: 'mainCourses', filtering: false})
                break;
            }
            case 'mineKurs': {
                this.setState({searchParam: 'myCourses', filtering: false})
                break;
            }
            default: {
                this.setState({searchParam: 'courses', filtering: false})
                try {
                    const courses = await getAllCourses();
                    if (!courses) {
                        this.setState({
                            error: 'Could not find courses!'
                        })
                        return;
                    }
                    this.setState({courses});
                } catch (error) {
                    this.setState({
                        error: 'Something went wrong!'
                    })
                    return;
                }
                break;
            }
        }
    }

  setSiteHeaderDynamically(siteHeader: string){
    this.setState({siteHeader})
  }

  setFilteringState(bool: boolean){
    this.setState({
      filtering: bool,
    })
  }

  render() {
    //@ts-ignore
    const {courses, searching, searchValues, mainCourses} = this.state;
    //@ts-ignore
    const {siteHeader} = this.state;
    //@ts-ignore
    const tray = this.state.trayState;
    return (
      <Router>
        <ApplicationLayout
          headerButtons={
            <>
              <PageHeaderButton
                icon="Search"
                text="Søk"
                onClick={() => this.handleSearch()}
              />
              {searching ?
                <Input
                  style={{flex: 1, marginLeft: 10}}
                  id="search-field"
                  placeholder="Søk her..."
                  onChange={(event: any) => this.handleChangeSearch(event)}
                /> :
                <PageHeaderButton
                  icon="Filter"
                  text="Filter"
                  onClick={(event: any) => this.changeTray('filter', event)}/>}
            </>
          }
          headerText={siteHeader}
          navbarSections=
            {
              <>
                <NavbarSection>
                  <NavbarButton
                    icon="AdminHome"
                    text="Min side"
                    onClick={()=> {this.closeSearch('dinSide'); this.setSiteHeaderDynamically('Min Side')}}
                    as={Link}
                    to="/dinside"/>
                  <NavbarButton
                    icon="UserPlans"
                    text="Mine kurs"
                    onClick={()=> {this.closeSearch('mineKurs'); this.setSiteHeaderDynamically('Mine Kurs')}}
                    as={Link}
                    to="/mycourses"
                  />
                  <NavbarButton
                    icon="Learn"
                    text="Kursoversikt"
                    onClick={()=> {this.closeSearch('kursoversikt'); this.setSiteHeaderDynamically('Kursoversikt')}}
                    as={Link}
                    to="/courses"/>
                  <NavbarButton
                    icon="User"
                    text="Profil"
                    as={Link}
                    onClick={ ()=> {this.setSiteHeaderDynamically('Profil')}}
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
                       // @ts-ignore
                       <DinSide {...props} mainCourses={mainCourses} setMainCourses={this.setMainCourses.bind(this)} searchValues={searchValues}  filtering={this.state.filtering}/>
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
                  // @ts-ignore
                  <Kursoversikt {...props} courses={courses} searchValues={searchValues} filtering={this.state.filtering}/>
                )}>
              </Route>
              <Route
                path='/coursedetails/:id'
                render={(props) => (
                  <Kurs {...props} />
                )}>
              </Route>
              <Route
                path='/mycourses'
                render={(props) => (
                  // @ts-ignore
                  <MineKurs {...props} setMyCourses={this.setMyCourses.bind(this)} searchValues={searchValues} filtering={this.state.filtering}/>
                )}>
              </Route>
            </Switch>
          </div>
        </ApplicationLayout>
      </Router>
    )
  }
}