import React from 'react';
import { getAllCourses } from './kursoversiktFunction';
import {Link} from "react-router-dom";
import {Card, H3, NavbarButton, Text} from "@dossier/mithra-ui";
import {Kurs} from "../kurs/kurs";

export class Kursoversikt extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      courses: [],
      error: null,
      courseDetails: ''
    }
  };

  async componentDidMount() {
    const courses = await getAllCourses();
    // @ts-ignore
    this.setState({courses});
  }


  handleClick(courseId: any,) {
    this.setState({courseDetails: courseId})
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
      flexWrap: 'wrap'
    }

    const courseCard = courses
      // @ts-ignore
      .map(({ course_id, course_name, course_description, image_url}) => {
        const styles = {
          fontSize: '16px',
          border: '1px solid black',
          padding: 20,
          margin: 10,
          overflow: 'hidden',
          maxHeight: '300px',
          maxWidth: '300px'
        };
        const imageStyles = {
          maxWidth: '200px',
          maxHeight: '133px'
        }

        return (

        <Card
          style={{
            maxWidth: '25em',
            margin: 10,
          }}
          onClick={(event) => this.handleClick({course_id}, )}
        >
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