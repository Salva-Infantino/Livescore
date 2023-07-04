const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const fetchLiveMatches = async (param) => {
  try {
    const response = await fetch(API_URL + param, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    });
    const data = await response.json();

    if (data.response) {
      return data.response;
    } else {
      console.log('No match data found.');
      return [];
    }
  } catch (error) {
    console.log('Error fetching matches:', error);
    return [];
  }
};
