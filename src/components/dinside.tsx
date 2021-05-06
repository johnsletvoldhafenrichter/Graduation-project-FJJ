import React from 'react';
import {Card, H5, H6, Stack, SubTitle2, Tab, Text} from "@dossier/mithra-ui";
import {getMyCourses} from '../functions/dinSideFunctions'
import '../css/courseCards.css';


export class DinSide extends React.Component {

    constructor(props: any) {
      super(props);
      this.state = {
        myCourses: [],
        error: null,
        activeTab: 'obligCourses',
      }
    }

    async handleClickTab(activeTab:string) {
      this.setState({activeTab})
      // @ts-ignore
      const courses = await getMyCourses(activeTab);
      if(courses.error) {
        this.setState({error:courses.error})
      }
      // @ts-ignore
      this.props.setMainCourses(courses);
    };

    handleClickCard(courseId: any) {
      // @ts-ignore
      const {history} = this.props;
      history.push("/coursedetails/" + courseId);
    }

    async componentDidMount() {
      // @ts-ignore
      const {activeTab} = this.state;
      const courses = await getMyCourses(activeTab);
      if(courses.error) {
        this.setState({error:courses.error})
      }
      // @ts-ignore
      this.props.setMainCourses(courses);
    }

    render () {
      // @ts-ignore
      const {error} = this.state;
      if (error) {
        //@ts-ignore
        return <div>Error!</div>
      }
      // @ts-ignore
      let {activeTab} = this.state;
      // @ts-ignore
      let {searchValues, mainCourses} = this.props;
      if (searchValues.length > 0) {
        mainCourses = searchValues;
      }
      if(mainCourses.length < 1) {
        return <div>no courses from props</div>
      }

      let courseCard = mainCourses
          // @ts-ignore
          .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
            return (
              // @ts-ignore
              <Card className={'card'} onClick={(event) => this.handleClickCard(course_id)} key={course_id}>
                <img className={'imageStyles'} alt="amazingeness" src={image_url}/>
                <H5 className={'H5Style truncate'}>
                  {course_name}
                </H5>
                <div className={'dateContainer'}>
                  <Text className={'dateStyles'}>
                    <SubTitle2 className={'dateTitleStyle'}>
                      Start dato
                    </SubTitle2>
                    {start_date.slice(0, 10)}
                  </Text>
                  <Text className={'dateStyles'}>
                    <SubTitle2 className={'dateTitleStyle'}>
                      Slutt dato
                    </SubTitle2>
                    {end_date.slice(0, 10)}
                  </Text>
                </div>
                <div className={'obligContainer'}>
                  <H6 className={'H6Styles'}>
                    Oppmeldingsfrist
                  </H6>
                  <H6 className={'dateTitleStyle'}>
                    {enrollment_end.slice(0, 10)}
                  </H6>
                </div>
                <Text className={'H6Styles'}>
                  Tilbyder: {org}
                </Text>
              </Card>
            );
          });

        return (
          <div className="dinSideContainer">

            {/*Tab buttons*/}
            <Stack style={{justifyContent: 'center'}}>
              <Tab
                active={activeTab === "obligCourses"}
                onClick={() => this.handleClickTab("obligCourses")}
              >
                Obligatoriske kurs
              </Tab>
              <Tab
                active={activeTab === "localCourses"}
                onClick={() => this.handleClickTab("localCourses")}
              >
                Lokale kurs
              </Tab>
              <Tab
                active={activeTab === "recommendedCourses"}
                onClick={() => this.handleClickTab("recommendedCourses")}
              >
                Anbefalte kurs
              </Tab>
            </Stack>

            {/*Card view*/}
            <div className={'coursesContainer'}>
              {courseCard}
            </div>

          </div>
        );
    }
}