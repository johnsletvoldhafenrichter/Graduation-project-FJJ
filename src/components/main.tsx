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

export default class Main extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      trayState: null,
      searching: false,
      searchField: '',
      courses: [],
      searchValues: [],
      myCourses: [],
      searchParam: '',
      mainCourses: []
    }
  }

  async componentDidMount() {
    //@ts-ignore
    try {
      // @ts-ignore
      const courses = await getAllCourses();
      if (!courses) {
        this.setState({
          error: 'Could not find courses!'
        })
        return;
      }
      // @ts-ignore
      this.setState({courses});
    } catch (error) {
      this.setState({
        error: 'Something went wrong!'
      })
      return;
    }
    console.log(this.props)
  }

  changeTray(trayName: string, event: any): void {
    //@ts-ignore
    if (!this.state.trayState) {
      this.setState({
        //@ts-ignore
        trayState: <Filter closeFunction={this.closeTray.bind(this)}/>
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
    // @ts-ignore
    this.setState({searching: !this.state.searching, searchValues: []})
  }

  handleChangeSearch(event: { target: any }) {
    this.setState({searchField: event.target.value})
    // @ts-ignore
    if (this.state.searchParam === 'courses') {
      console.log('handleChangeSearch')
      this.checkForResults('courses')
      // @ts-ignore
    } else if (this.state.searchParam === 'myCourses'){
      console.log('myCourses')
      this.checkForResults('myCourses')
      // @ts-ignore
    } else if (this.state.searchParam === 'mainCourses'){
      console.log('mainCourses')
      this.checkForResults('mainCourses')
    }
  }

  async checkForResults(str:any) {
    if (str === 'courses') {
      //@ts-ignore
      const currentString = this.state.searchField
      //@ts-ignore
      let courses = this.state.courses.slice()
      //@ts-ignore
      let searchValues = [];
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].course_name.toLowerCase().includes(currentString)) {
          searchValues.push(courses[i])
        }
      }
      if (searchValues.length < 1) {
        //@ts-ignore
        searchValues = null;
      }
      // @ts-ignore
      await this.setState({searchValues})
    } else if (str === 'myCourses') {
      //@ts-ignore
      const currentString = this.state.searchField
      //@ts-ignore
      let courses = this.state.myCourses.slice()
      //@ts-ignore
      let searchValues = [];
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].course_name.toLowerCase().includes(currentString)) {
          searchValues.push(courses[i])
        }
      }
      if (searchValues.length < 1) {
        //@ts-ignore
        searchValues = null;
      }
      // @ts-ignore
      await this.setState({searchValues})
    } else if (str === 'mainCourses') {
      //@ts-ignore
      const currentString = this.state.searchField
      //@ts-ignore
      let courses = this.state.mainCourses.slice()
      //@ts-ignore
      let searchValues = [];
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].course_name.toLowerCase().includes(currentString)) {
          searchValues.push(courses[i])
        }
      }
      if (searchValues.length < 1) {
        //@ts-ignore
        searchValues = null;
      }
      // @ts-ignore
      await this.setState({searchValues})    }
  }

  async setMyCourses(test: any) {
    await this.setState({myCourses:test})
  }

  closeSearch(str: string){
    this.setState({searching: false, searchValues: []})
    switch (str) {
      case 'dinSide': {
        this.setState({searchParam: 'dinSide'})
        break;
      }
      case 'mineKurs': {
        this.setState({searchParam: 'myCourses'})
        break;
      }
      default: {
        this.setState({searchParam: 'courses'})
        break;
      }
    }
  }

  render() {
    //@ts-ignore
    const {courses, searching, searchValues} = this.state;
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
          headerText="Min side"
          navbarSections=
            {
              <>
                <NavbarSection>
                  <NavbarButton
                    icon="AdminHome"
                    text="Min side"
                    onClick={()=> this.closeSearch('dinSide')}
                    as={Link}
                    to="/dinside"/>
                  <NavbarButton
                    icon="UserPlans"
                    text="Mine kurs"
                    onClick={()=> this.closeSearch('mineKurs')}
                    as={Link}
                    to="/mycourses"
                  />
                  <NavbarButton
                    icon="Learn"
                    text="Kursoversikt"
                    onClick={()=> this.closeSearch('kursoversikt')}
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
          <div className="App ds-typography-body" style={{padding: '0px'}}>
            <Switch>
              <Route path="/dinside"
                     render={(props) => (
                       // @ts-ignore
                       <DinSide {...props} searchValues={searchValues} />
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
                  <Kursoversikt {...props} courses={courses} searchValues={searchValues}/>
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
                  <MineKurs {...props} setMyCourses={this.setMyCourses.bind(this)} searchValues={searchValues}/>
                )}>
              </Route>
            </Switch>
          </div>
        </ApplicationLayout>
      </Router>
    )
  }
}