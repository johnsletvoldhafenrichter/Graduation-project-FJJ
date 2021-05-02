import React from "react";
import {getCourseById} from "../functions/kursFunctions";
import {Card, H5, H6, SubTitle2, Text} from "@dossier/mithra-ui";


const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export class MineKurs extends React.Component{
  constructor(props: any) {
    super(props);
    this.state = {
      myStartedCourses: [],
      error: null
    }
  };

  async getStartedCourses(userId: Number) {
    const result: any = await axios(serverUrl + '/mycourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('dossier_session_token')
      },
      data: {userId}
    })
    return result.data;
  };

  async componentDidMount() {
    try {
      const userId:any = localStorage.getItem('session_user_id');
      const myStartedCourses = await this.getStartedCourses(userId);
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
    const {myStartedCourses} = this.state;
    const courseCard = myStartedCourses
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
      <div className={'coursesContainer'}>
        {courseCard}
      </div>
    );
  }

}