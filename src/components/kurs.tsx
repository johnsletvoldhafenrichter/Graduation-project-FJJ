import {getCourseById} from "../functions/kursFunctions";
import React from "react";
import {SimpleTable} from "@dossier/mithra-ui";

export class Kurs extends React.Component {
    constructor(props: {} | Readonly<{}>) {
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
            <>
                <img src={image_url} alt={image_description}/>
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
                            Description:
                        </th>
                        <td>
                            {course_description}
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
            </>
        )
    }
}
