import React from 'react';
import {Card, H5, Text, H6, Stack, SubTitle2, Tag, SimpleTable, Tab} from "@dossier/mithra-ui";
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

    formatDate(date: any) {
        let day = date.slice(8, 10);
        let month = date.slice(5, 7)
        let year = date.slice(0, 4)
        return `${day}-${month}-${year}`;
    }

    render() {
        // @ts-ignore
        const {error, courseDetails} = this.state;
        // @ts-ignore
        let {courses, searchValues, filtering} = this.props;

        if (searchValues === null) {
            return <div>Nothing found!</div>
        } else if (searchValues.length > 0) {
            courses = searchValues;
        }
        if (error) {
            return <div>{error}!</div>
        }
        //@ts-ignore
        const courseCard = courses
            // @ts-ignore
            .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
                return (
                    // @ts-ignore
                    <Card className={'card'} onClick={(event) => this.handleClick(course_id)} key={course_id} style={{cursor: 'pointer'}}>
                        <img className={'imageStyles'} alt="amazingeness" src={image_url}/>
                        <H5 className={'H5Style truncate'}>
                            {course_name}
                        </H5>
                        <div className={'dateContainer'}>
                            <Text className={'dateStyles'}>
                                <SubTitle2 className={'dateTitleStyle'}>
                                    Oppmeldingsfrist
                                </SubTitle2>
                                {this.formatDate(enrollment_end)}
                            </Text>
                            <Text className={'dateStyles'}>
                                <SubTitle2 className={'dateTitleStyle'}>
                                    Start dato
                                </SubTitle2>
                                {this.formatDate(start_date)}
                            </Text>
                        </div>
                        <Text className={'H6Styles'}>
                            Tilbyder: <Tag
                            intent="neutral"
                            text={org}
                        />
                        </Text>
                    </Card>
                );
            });
        // @ts-ignore
        return (
            // @ts-ignore
            courseDetails ? <Kurs course={courseDetails}/> :
                <div className="allCoursesContainer">
                    {!filtering ?
                        <Tab style={{cursor: 'auto', justifyContent: 'center'}}>
                            Filtrer eller søk i alle kurs
                        </Tab>
                        :
                        <Tab style={{cursor: 'auto', justifyContent: 'center'}}>
                            Filtrering
                        </Tab>}
                    <div className={'coursesContainer'}>
                        {courseCard}
                    </div>
                </div>
        );
    }
}