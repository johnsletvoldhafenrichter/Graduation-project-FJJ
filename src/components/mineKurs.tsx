import React from "react";
import {getCourses} from "../functions/mineKursFunctions";
import {Card, H5, H6, SubTitle2, Text, Stack, Tab} from "@dossier/mithra-ui";

export class MineKurs extends React.Component{
  constructor(props: any) {
    super(props);
    this.state = {
      myCourses: [],
      error: null,
      activeTab: 'startedCourses',
    }
  };

  async handleClick(str:string) {
    this.setState({
      activeTab: str,
    })
    // @ts-ignore
    const courses = await getCourses(str);
    if(courses.error) {
      this.setState({error:courses.error})
    }
    this.setState({myCourses: courses});
  };

  async componentDidMount() {
    // @ts-ignore
    const {activeTab} = this.state;
    const courses = await getCourses(activeTab);
    if(courses.error) {
      this.setState({error:courses.error})
    }
    this.setState({myCourses: courses});
  }

  render() {
    // @ts-ignore
    const {error} = this.state;
    if(error) {
      return <div>ERROR!!!</div>
    }
    // @ts-ignore
    const {myCourses: myCourses, activeTab} = this.state;
    const courseCard = myCourses
      // @ts-ignore
      .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
        return (
          // @ts-ignore
          <Card className={'card'} onClick={(event) => this.handleClick(course_id)}>
            <img className={'imageStyles'} alt="image" src={image_url}/>
            <H5 className={'H5Style'}>
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
            <div className={'enrollmentContainer'}>
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

    return(
      <div>

        {/*Tab buttons*/}
        <Stack style={{justifyContent: 'center'}}>
          <Tab
            active={activeTab === "enrolledCourses"}
            onClick={() => this.handleClick("enrolledCourses")}
          >
            Påmeldte kurs
          </Tab>
          <Tab
            active={activeTab === "startedCourses"}
            onClick={() => this.handleClick("startedCourses")}
          >
            Påbegynte kurs
          </Tab>
          <Tab
            active={activeTab === "competedCourses"}
            onClick={() => this.handleClick("competedCourses")}
          >
            Fullførte kurs
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