import React from 'react';
import {Card, H5, H6, Stack, SubTitle2, Tab, Tag, Text} from "@dossier/mithra-ui";
import {getMyCourses} from '../functions/dinSideFunctions'
import '../css/courseCards.css';


export class DinSide extends React.Component {

    constructor(props: any) {
      super(props);
      this.state = {
        myCourses: [],
        error: null,
        activeTab: 'obligCourses',
      }
    }

    async handleClickTab(activeTab:string) {
      this.setState({activeTab})
      // @ts-ignore
      const courses = await getMyCourses(activeTab);
      if(courses.error) {
        this.setState({error:courses.error})
      }
      // @ts-ignore
      this.props.setMainCourses(courses);
    };

    handleClickCard(courseId: any) {
      // @ts-ignore
      const {history} = this.props;
      history.push("/coursedetails/" + courseId);
    }

    async componentDidMount() {
      // @ts-ignore
      const {activeTab} = this.state;
      const courses = await getMyCourses(activeTab);
      if(courses.error) {
        this.setState({error:courses.error})
      }
      // @ts-ignore
      this.props.setMainCourses(courses);
    }

    formatDate(date: any) {
        let day = date.slice(8,10);
        let month = date.slice(5, 7)
        let year = date.slice(0,4)
        return  `${day}-${month}-${year}`;
    }

    render () {
      // @ts-ignore
      const {error} = this.state;
      if (error) {
        //@ts-ignore
        return <div>Error!</div>
      }
      // @ts-ignore
      let {activeTab} = this.state;
      // @ts-ignore
      let {searchValues, mainCourses} = this.props;
      if (searchValues.length > 0) {
        mainCourses = searchValues;
      }
      if(mainCourses.length < 1) {
        return <div>no courses from props</div>
      }

        const courseCard = mainCourses
            // @ts-ignore
            .map(({course_id, course_name, image_url, start_date, end_date, org, enrollment_end}) => {
                return (
                    // @ts-ignore
                    <Card className={'card'} onClick={(event) => this.handleClickCard(course_id)} key={course_id}>
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

        return (
          <div className="dinSideContainer">

            {/*Tab buttons*/}
            <Stack style={{justifyContent: 'center'}}>
              <Tab
                active={activeTab === "obligCourses"}
                onClick={() => this.handleClickTab("obligCourses")}
              >
                Obligatoriske kurs
              </Tab>
              <Tab
                active={activeTab === "localCourses"}
                onClick={() => this.handleClickTab("localCourses")}
              >
                Lokale kurs
              </Tab>
              <Tab
                active={activeTab === "recommendedCourses"}
                onClick={() => this.handleClickTab("recommendedCourses")}
              >
                Anbefalte kurs
              </Tab>
            </Stack>

            {/*Card view*/}
            <div className={'coursesContainer'}>
              {courseCard}
            </div>

          </div>
        );
    }
}