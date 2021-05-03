const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function getStartedCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/myStartedCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
};

export async function getEnrolledCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/myEnrolledCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
};

export async function getCompletedCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/myCompletedCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
};

export async function getCourses(activeTab: string) {
  try {
    const userId:any = localStorage.getItem('session_user_id');
    const myStartedCourses = await switchCourseView(userId, activeTab);
    if (myStartedCourses.length < 1) {
      return({
        error: 'Could not find courses!'
      })
    }
    return myStartedCourses;
  } catch (error) {
    return({
      error: 'Component did not mount!'
    })
  }
}

async function switchCourseView(userId: any, activeTab: string) {
  let courses:any;
   switch (activeTab) {
    case 'enrolledCourses':
      courses = await getEnrolledCoursesByUserId(userId);
      break;
    case 'startedCourses':
      courses = await getStartedCoursesByUserId(userId);
      break;
    case 'competedCourses':
      courses = await getCompletedCoursesByUserId(userId);
      break;
    }
  return courses;
};
