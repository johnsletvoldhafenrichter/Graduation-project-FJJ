import React from 'react';
import { getAllCourses } from './kursoversiktFunction';
import {Link} from "react-router-dom";
import {Card, H5, SubTitle, Text, H6, SubTitle2} from "@dossier/mithra-ui";
import {Kurs} from "../kurs/kurs";

export class Kursoversikt extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            courses: [],
            error: null,
        }
    };

    async componentDidMount() {
        try {
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
    }

    handleClick(courseId: number) {
        // @ts-ignore
        const {history} = this.props;
        history.push("/coursedetails/" + courseId);
    }

    render() {
        const {
            // @ts-ignore
            courses,
            // @ts-ignore
            courseDetails
        } = this.state;
        const courseStyles = {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }

        console.log(courses[1]);

        const courseCard = courses
          // @ts-ignore
          .map(({ course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {

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
              const noMargins = {
                  margin: '0px'
              };
              const H6Styles = {
                  margin: '0px',
                  fontSize: '12px'
              };


              return (

                <Card
                  // @ts-ignore
                  style={cardStyle}
                  onClick={(event) => this.handleClick({course_id}, )}
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

        return(
          // @ts-ignore
          courseDetails ? <Kurs course={courseDetails}/> :
            // @ts-ignore
            <div style={courseStyles}>
                {courseCard}
            </div>
        );
    }
}