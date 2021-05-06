import {getCourseById} from "../functions/kursFunctions";
import React from "react";
import {Card, H5, H6, SimpleTable, SubTitle2, Text} from "@dossier/mithra-ui";
import '../css/kurs.css'

export class Kurs extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            course: [],
            error: '',
            courseLocationArray: []
        }
    }

    async componentDidMount() {
        try {
            //@ts-ignore
            const {id} = this.props.match.params;
            const course = await getCourseById(id);
            if (!course) {
                this.setState({
                    error: 'Could not find course!'
                })
                return;
            }
            this.setState({course: course.data[0]})
            let courseLocationArray: string[] = [];
            course.data.forEach((course: { location_name: string; }) => courseLocationArray.push(course.location_name))
            this.setState({courseLocationArray})

        } catch (error) {
            this.setState({
                error: 'Something went wrong!'
            })
            return;
        }
    }

    formatDate(date: any) {
        let day = date.slice(8,10);
        let month = date.slice(5, 7)
        let year = date.slice(0,4)
        return  `${day}-${month}-${year}`;
    }

    render() {
        //@ts-ignore
        const courseDetail = this.state.course;
        //@ts-ignore
        const {courseLocationArray} = this.state;
        // @ts-ignore
        const courseLocationElements = courseLocationArray.map(({location_name}) => {
              return (
                  <br>
                    {location_name}
                  </br>

              )}
            );

        let {image_url,
            image_description,
            course_name,
            org,
            course_description,
            start_date,
            end_date,
            enrollment_start,
            enrollment_end} = courseDetail;

        if (start_date && end_date && enrollment_start && enrollment_end) {
            start_date = this.formatDate(start_date);
            end_date = this.formatDate(end_date);
            enrollment_start = this.formatDate(enrollment_start);
            enrollment_end = this.formatDate(enrollment_end);
        }

        // @ts-ignore
        const {error} = this.state
        if (error) {
            return <div>{error}!</div>
        }
        return (
            <div className={'individualCoursesContainer'}>
                {/* Header */}
                <h1 className={'header'}>
                    {course_name}
                </h1>
                {/* END Header */}

                {/* Image and table container */}
                <div className={'imageAndTableContainer'}>
                    {/*Course Image*/}
                    <div className={'infoContainer'}>
                        <img className={'img'} src={image_url} alt={image_description}/>
                    </div>
                    {/* END Course Image */}

                    {/* Course Description Table */}
                    <div className={'infoContainer'} id={'tableContainer'}>

                            <h4 className={'dateTit'} id={'startDateTit'}>Startdato:</h4>
                            <p className={'dateDisp'}>{start_date}</p>

                            <h4 className={'dateTit'}>Sluttdato:</h4>
                            <p className={'dateDisp'}>{end_date}</p>

                            <h4 className={'dateTit'}>Oppmeldingsstart:</h4>
                            <p className={'dateDisp'}>{enrollment_start}</p>

                            <h4 className={'dateTit'}>Oppmeldingsslutt:</h4>
                            <p className={'dateDisp'}>{enrollment_end}</p>

                            <h4 className={'dateTit'}>Tilbys ved:</h4>
                            <div>{courseLocationArray}</div>


                            <div>
                                <h4 className={'dateTit'}>
                                    Tilbyder:
                                </h4>
                                {org}
                            </div>
                    </div>
                    {/* END Course Description Table */}
                </div>
                {/*END Image and table container*/}


                <div>
                    <h4 className={'descTit'}>
                        Beskrivelse:
                    </h4>
                    <p className={'descPar'}>
                        {course_description}
                    </p>
                </div>


            </div>
        )
    }
}
