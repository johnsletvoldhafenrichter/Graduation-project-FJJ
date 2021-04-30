import React from 'react';
import axios from 'axios';
import {Card, H3, Text} from "@dossier/mithra-ui";
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

    handleClick(courseId: any, course_name: string) {
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
        const {obligCourses} = this.state;

        const courseCard = obligCourses
          // @ts-ignore
          .map(({course_id, course_name, course_description, image_url}) => {
              const imageStyles = {
                  maxWidth: '200px',
                  maxHeight: '133px'
              }
              return (
                <Card
                  style={{
                      maxWidth: '25em',
                      margin: 10,
                      flexDirection: 'row'
                  }}
                  onClick={(event) => this.handleClick(course_id, course_name)}
                >
                    <H3>OBLIG!</H3>
                    <img alt="image" style={imageStyles} src={image_url}/>
                    <H3>
                        {course_name}
                    </H3>
                    <Text>
                        {course_description}
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