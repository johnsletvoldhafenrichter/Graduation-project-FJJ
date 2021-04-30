import React from 'react';
import {getAllCourses} from '../functions/kursoversiktFunction';
import {Card, H3, Text} from "@dossier/mithra-ui";
import {Kurs} from "./kurs";

export class Kursoversikt extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            courses: [],
            error: '',
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


    handleClick(courseId: any, course_name: string) {
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
            flexWrap: 'wrap'
        }
        // @ts-ignore
        const {error} = this.state
        if (error) {
            return <div>{error}!</div>
        }

        const courseCard = courses
            // @ts-ignore
            .map(({course_id, course_name, course_description, image_url}) => {
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
                            flexDirection: 'row'
                        }}
                        onClick={(event) => this.handleClick(course_id, course_name)}
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

        return (
            // @ts-ignore
            courseDetails ? <Kurs course={courseDetails}/> :
                // @ts-ignore
                <div style={courseStyles}>
                    {courseCard}
                </div>
        );
    }
}