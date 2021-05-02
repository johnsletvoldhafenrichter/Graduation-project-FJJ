import React from "react";
import {getStartedCoursesByUserId} from "../functions/mineKursFunctions";
import {Card, H5, H6, SubTitle2, Text, Stack, Tab} from "@dossier/mithra-ui";
import {Switch} from "react-router-dom";


export class MineKurs extends React.Component{
  constructor(props: any) {
    super(props);
    this.state = {
      myStartedCourses: [],
      error: null,
      activeTab: 'startedCourses',
    }
  };
  handleClick(str:string) {
    this.setState({
      activeTab: str,
    })
  }

  async componentDidMount() {
    try {
      const userId:any = localStorage.getItem('session_user_id');
      const myStartedCourses = await getStartedCoursesByUserId(userId);
      if (!myStartedCourses) {
        this.setState({
          error: 'Could not find courses!'
        })
        return;
      }
      this.setState({myStartedCourses});

    } catch (error) {
      this.setState({
        error: 'Component did not mount!'
      })
      return;
    }
  }

  render() {
    // @ts-ignore
    const {myStartedCourses, activeTab} = this.state;
    const startedCourseCard = myStartedCourses
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

        {
          // @ts-ignore
          {
            'enrolledCourses': <div>enrolledCourses</div>,
            'startedCourses':
                  <div className={'coursesContainer'}>
                    {startedCourseCard}
                  </div>,
            'competedCourses': <div>competedCourses</div>

          }[activeTab]
        }







      </div>
    );
  }

}