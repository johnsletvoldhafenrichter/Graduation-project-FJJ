import React from 'react';
import {getAllCourses} from '../functions/kursoversiktFunction';
import {Card, H5, SubTitle, Text, H6, SubTitle2} from "@dossier/mithra-ui";
import {Kurs} from "./kurs";
import '../css/courseCards.css';

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
    // @ts-ignore
    const {error} = this.state
    if (error) {
        return <div>{error}!</div>
    }

    const courseCard = courses
      // @ts-ignore
      .map(({ course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {

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
            className={'card'}
            // @ts-ignore
            onClick={(event) => this.handleClick(course_id)}
        >
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
      // @ts-ignore
      courseDetails ? <Kurs course={courseDetails}/> :
        // @ts-ignore
  <div style={courseStyles}>
    {courseCard}
  </div>
  );
}
}