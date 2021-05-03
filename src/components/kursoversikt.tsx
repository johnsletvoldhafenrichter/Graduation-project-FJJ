import React from 'react';
import {Card, H5, Text, H6, SubTitle2} from "@dossier/mithra-ui";
import {Kurs} from "./kurs";
import '../css/courseCards.css';

export class Kursoversikt extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    }
  };

  handleClick(courseId: number) {
    // @ts-ignore
    const {history} = this.props;
    history.push("/coursedetails/" + courseId);
  }

  render() {
    // @ts-ignore
    const {error, courseDetails} = this.state;
    // @ts-ignore
    let {courses, searchValues} = this.props;
    if (searchValues === null) {
      return <div>Nothing found!</div>
    } else if (searchValues.length > 0) {
      courses = searchValues;
    }
    if (error) {
      return <div>{error}!</div>
    }
    const courseCard = courses
      // @ts-ignore
      .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
        return (
          // @ts-ignore
          <Card className={'card'} onClick={(event) => this.handleClick(course_id)} key={course_id}>
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
      // @ts-ignore
      courseDetails ? <Kurs course={courseDetails}/> :
        <div className={'coursesContainer'}>
          {courseCard}
        </div>
    );
  }
}