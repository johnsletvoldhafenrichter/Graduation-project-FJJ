import React from 'react';
import { getAllCourses } from './kursoversiktFunction';

export class Kursoversikt extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      courses: [],
      error: null
    }
  };


  async componentDidMount() {
    const courses = await getAllCourses();
    // @ts-ignore
    this.setState({courses});
  }

  render() {
    const {
      // @ts-ignore
      courses,
      // @ts-ignore
      error
    } = this.state;
    const courseStyles = {
      display: 'flex',
      flexWrap: 'wrap'
    }

    const courseCard = courses
      // @ts-ignore
      .map(({ course_name, course_description, image_url}) => {
        const styles = {
          fontSize: '16px',
          border: '1px solid black',
          padding: 20,
          margin: 10,
          overflow: 'hidden',
          maxHeight: '300px',
          maxWidth: '300px',
        };
        const imageStyles = {
          maxWidth: '200px',
          maxHeight: '133px'
        }

        return (
          <div style={styles}>
            <img style={imageStyles} src={image_url}/>
            <p>{course_name}</p>
            <p>{course_description}</p>
          </div>
        );
      });

    return(
      // @ts-ignore
  <div style={courseStyles}>
    {courseCard}
  </div>
  );
}
}