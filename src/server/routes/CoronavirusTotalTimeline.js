import axios from 'axios';
// For now we're just storing the cached case information in memory since we aren't
// storing much data and using a database system like Redis is overkill for a couple of 
// objects.
let information = null;

// The "cases" variable contains the cache of the information from the dataset
// This variable is cleared every 20 minutes and if it's an empty object,
// we need to request from the COVID API again
const CACHE_EXPIRY_TIME = 60e3 * 20; // 20 minutes

// This function loops over a string and matches certain CSV characteristics to convert the data to an array
const csvStringToArray = strData => {
  const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
  let arrMatches = null, arrData = [[]];
  while (arrMatches = objPattern.exec(strData)){
      if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
      arrData[arrData.length - 1].push(arrMatches[2] ? 
          arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
          arrMatches[3]);
  }
  return arrData;
}

export default function CoronavirusTotalTimeline (app) {
  app.get('/api/coronavirus/timeline', async (req, res) => {
    if (!information) {
      const result = await axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
        .then(res => res.data)
        .catch(err => res.status(500).json(`An error has occured. Error: ${err.message}`));
      // Convert the data from the API into a more readable object format
      const data = csvStringToArray(result)
      // Daily data since 1/22/20 in an array
      information = data.slice(3).filter(Boolean);
      // Cut the first 4 parts of data off since they are headers
      for (let i = 0; i < information.length; i++) {
        information[i] = information[i].slice(4);
      }
      // Add all numbers together from all countries
      const summed = information[0].map(
          (x, idx) => information.reduce((sum, curr) => parseInt(sum || 0) + parseInt(curr[idx] || 0), 0)
      );
      information = summed;
      // Create a timer that clears the cache after 5 minutes.
      setTimeout(() => {
        information = null;
      }, CACHE_EXPIRY_TIME)
    }

    res.status(200).json(information);
  });
}