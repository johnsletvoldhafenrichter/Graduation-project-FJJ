import React from "react";
import {getCourses} from "../functions/mineKursFunctions";
import {Card, H5, H6, SubTitle2, Text, Stack, Tab} from "@dossier/mithra-ui";
import '../css/courseCards.css';

export class MineKurs extends React.Component{
  constructor(props: any) {
    super(props);
    this.state = {
      myCourses: [],
      error: null,
      activeTab: 'startedCourses',
    }
  };

  handleClickCard(courseId: any) {
    // @ts-ignore
    const {history} = this.props;
    history.push("/coursedetails/" + courseId);
  }

  async handleClickTab(str:string) {
    this.setState({
      activeTab: str,
    })
    // @ts-ignore
    const courses = await getCourses(str);
    if(courses.error) {
      this.setState({error:courses.error})
    }
    this.setState({myCourses: courses});
    // @ts-ignore
    this.props.setMyCourses(courses);
  };

  async componentDidMount() {
    // @ts-ignore
    const {activeTab} = this.state;
    const courses = await getCourses(activeTab);
    if(courses.error) {
      this.setState({error:courses.error})
    }
    this.setState({myCourses: courses});
  }

  formatDate(date: any) {
    let day = date.slice(8,10);
    let month = date.slice(5, 7)
    let year = date.slice(0,4)
    return  `${day}-${month}-${year}`;
  }

  render() {
    // @ts-ignore
    const {error} = this.state;
    if(error) {
      console.log(error)
      return <div>ERROR!!!</div>

    }
    //@ts-ignore
    let {myCourses, activeTab} = this.state;
    //@ts-ignore
    let {searchValues, filtering} = this.props;
    if (searchValues === null) {
      return <div>Nothing found!</div>
    } else if (searchValues.length > 0) {
      myCourses = searchValues;
    }

    const courseCard = myCourses
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

    return(
      <div className="minSideContainer">

        {/*Tab buttons*/}

        {filtering ? <div>Filtering!</div> :
        <Stack style={{justifyContent: 'center'}}>
          <Tab
            active={activeTab === "enrolledCourses"}
            onClick={() => this.handleClickTab("enrolledCourses")}
          >
            Kommende
          </Tab>
          <Tab
            active={activeTab === "startedCourses"}
            onClick={() => this.handleClickTab("startedCourses")}
          >
            Pågående
          </Tab>
          <Tab
            active={activeTab === "competedCourses"}
            onClick={() => this.handleClickTab("competedCourses")}
          >
            Fullførte
          </Tab>
        </Stack>
        }
        {/*Card view*/}
        <div className={'coursesContainer'}>
          {courseCard}
        </div>

      </div>
    );
  }
}