import {getCourseById} from "../functions/kursFunctions";
import React from "react";
import {SimpleTable} from "@dossier/mithra-ui";
import '../css/kurs.css'

export class Kurs extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            course: {},
            error: ''
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
            this.setState({course: course.data})

        } catch (error) {
            this.setState({
                error: 'Something went wrong!'
            })
            return;
        }
    }

    render() {
        //@ts-ignore
        const courseDetail = this.state.course;
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
            start_date = start_date.slice(0,10);
            end_date = end_date.slice(0,10);
            enrollment_start = enrollment_start.slice(0,10);
            enrollment_end = enrollment_end.slice(0,10);
        }

        // @ts-ignore
        const {error} = this.state
        if (error) {
            return <div>{error}!</div>
        }
        return (
            <div className={'individualCoursesContainer'}>
                {/* Header */}
                <h3 className={'header'}>
                    {course_name}
                </h3>
                {/* END Header */}

                {/* Image and table container */}
                <div className={'imageAndTableContainer'}>
                    {/*Course Image*/}
                    <div className={'infoContainer'}>
                        <img className={'img'} src={image_url} alt={image_description}/>
                    </div>
                    {/* END Course Image */}

                    {/* Course Description Table */}
                    <div className={'infoContainer'}>
                        <SimpleTable>
                            <tbody>
                            <tr>
                                <th>
                                    Navn:
                                </th>
                                <td>
                                    {course_name}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Organization:
                                </th>
                                <td>
                                    {org}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Course Start Date:
                                </th>
                                <td>
                                    {start_date}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Course End Date:
                                </th>
                                <td>
                                    {end_date}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Enrollment Start Date:
                                </th>
                                <td>
                                    {enrollment_start}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Enrollment End Date:
                                </th>
                                <td>
                                    {enrollment_end}
                                </td>
                            </tr>
                            </tbody>
                        </SimpleTable>
                    </div>
                </div>
                {/*END Image and table container*/}




                <tr>
                    <th>
                        Description:
                    </th>
                    <td>
                        {course_description}
                    </td>
                </tr>
            </div>
        )
    }
}
