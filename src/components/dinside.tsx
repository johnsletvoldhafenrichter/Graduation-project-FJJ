import React from 'react';
import axios from 'axios';
import {Card, H3, H5, H6, SubTitle2, Text} from "@dossier/mithra-ui";
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
        const {obligCourses} = this.state;

        const courseCard = obligCourses
          // @ts-ignore
          .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
            const cardStyle = {
              maxWidth: '15em',
              height: '20em',
              margin: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px'
            };
            const imageStyles = {
              flex: 1,
              maxWidth: '10em',
              maxHeight: '7em',
              margin: '10px 0px 10px 0px'
            }
            const H5Style = {
              flex: 1,
              minHeight: '2.5em',
              margin: '0px',
              fontSize: '14px',
              fontWeight: 'bold'
            }

            const divDateStyles = {
              flex: 1,
              width: '100%',
              display: 'flex',
            };
            const dateStyles = {
              width: '50%',
              margin: '0px 5px 0px 5px',
              fontSize: '11px'
            };
            const dateTitleStyle = {
              margin: '0px',
              fontSize: '12px'
            };
            const H6Styles = {
              margin: '0px',
              fontSize: '12px'
            };

              return (
                <Card
                  // @ts-ignore
                  style={cardStyle}
                  onClick={(event) => this.handleClick(course_id)}
                >
                  <img alt="image" style={imageStyles} src={image_url}/>
                  <H5 style={H5Style}>
                    {course_name}
                  </H5>
                  <div style={divDateStyles}>
                    <Text style={dateStyles}>
                      <SubTitle2 style={dateTitleStyle}>
                        Start dato
                      </SubTitle2>
                      {start_date.slice(0, 10)}
                    </Text>
                    <Text style={dateStyles}>
                      <SubTitle2 style={dateTitleStyle}>
                        Slutt dato
                      </SubTitle2>
                      {end_date.slice(0, 10)}
                    </Text>
                  </div>
                  <div style={{margin:'5px 0px'}}>
                    <H6 style={H6Styles}>
                      Oppmeldingsfrist
                    </H6>
                    <H6 style={dateTitleStyle}>
                      {enrollment_end.slice(0, 10)}
                    </H6>
                  </div>
                  <Text style={H6Styles}>
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