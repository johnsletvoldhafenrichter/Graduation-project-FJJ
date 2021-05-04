import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function getMyCourses(activeTab: string) {
  try {
    const userId:any = localStorage.getItem('session_user_id');
    const myCourses = await switchCourseView(userId, activeTab);
    if (myCourses.length < 1) {
      return({
        error: 'Could not find courses!'
      })
    }
    return myCourses;
  } catch (error) {
    return({
      error: 'Component did not mount!'
    })
  }
}
async function switchCourseView(userId: any, activeTab: string) {
  let courses:any;
  switch (activeTab) {
    case 'obligCourses':
      courses = await getObligCoursesByUserId(userId);
      break;
    case 'localCourses':
      courses = await getLocalCoursesByUserId(userId);
      break;
    case 'recommendedCourses':
      courses = await getRecommendedCoursesByUserId(userId);
      break;
  }
  return courses;
};

async function getObligCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/obligatory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
}

async function getLocalCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
}

async function getRecommendedCoursesByUserId(userId: Number) {
  const result: any = await axios(serverUrl + '/recommended', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {userId}
  })
  return result.data;
}