import React from 'react';
import axios from 'axios';
import {Card, H5, H6, SubTitle2, Text} from "@dossier/mithra-ui";
import '../css/courseCards.css';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export class DinSide extends React.Component {

    constructor(props: any) {
        super(props);

        this.state = {
            obligCourses: [],
            recommendedCourses: [],
            localCourses: []
        }
    }

    async getObligCoursesByUserId(userId: Number) {
        const result: any = await axios(serverUrl + '/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': localStorage.getItem('dossier_session_token')
            },
            data: {userId}
        })
        return result.data;
    }

    // async getLocalCoursesByUserLocationId(locationId) {
    //
    // }

    handleClick(courseId: any) {
        // @ts-ignore
        const {history} = this.props;
        history.push("/coursedetails/" + courseId);
    }

    async componentDidMount() {
        const userId: any = localStorage.getItem('session_user_id')
        const obligCourses = await this.getObligCoursesByUserId(userId)
        this.setState({obligCourses});
        // @ts-ignore

    }

    render () {
        // @ts-ignore
        const courseCard = this.state.obligCourses
          // @ts-ignore
          .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
              return (
                <Card className={'card'} onClick={(event) => this.handleClick(course_id)} key={course_id}>
                  <img className={'imageStyles'} alt="amazingness" src={image_url}/>
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

        return (
          //@ts-ignore
          <div> {courseCard}
          </div>
        )
    }
}