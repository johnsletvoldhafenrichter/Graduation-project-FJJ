import {getCourseById} from "./kursFunctions";
import React from "react";
import {SimpleTable} from "@dossier/mithra-ui";

export class Kurs extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      course : {}
    }
  }

  async componentDidMount() {
    // @ts-ignore
    const courseId = this.props.course.course_id
    const course = await getCourseById(courseId);

    this.setState({course:course.data})
  }


  render() {
    console.log(this.props)
    // @ts-ignore
    const courseDetail = this.state.course
      return (
        <>
        <img src={courseDetail.image_url} alt="eat my shit"/>
        <SimpleTable>
          <tbody>
          <tr>
            <th>
              Navn:
            </th>
            <td>
              {courseDetail.course_name}
            </td>
          </tr>
          <tr>
            <th>
              start:
            </th>
            <td>
              {courseDetail.start_date}
            </td>
          </tr>
          <tr>
            <th>
              Item:
            </th>
            <td>
              {courseDetail.course_description}
            </td>
          </tr>
          </tbody>
        </SimpleTable>
        </>
      )
  }
}
