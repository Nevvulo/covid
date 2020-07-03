import axios from 'axios';
// For now we're just storing the cached case information in memory since we aren't
// storing much data and using a database system like Redis is overkill for a couple of 
// objects.

// If we wanted to upscale this system and have more robust caching or make it work
// across multiple clusters, using a global database system would be more practical.
let cases = {};

// The "cases" variable contains the cache of the information from the COVID API
// This variable is cleared every 5 minutes and if it's an empty object,
// we need to request from the COVID API again
const CACHE_EXPIRY_TIME = 60e3 * 5; // 5 minutes
export default function CoronavirusCasesTotal (app) {
  app.get('/api/coronavirus/total', async (req, res) => {
    if (!cases.total) {
      const result = await axios.get('https://api.covid19api.com/world/total')
        .then(res => res.data)
        .catch(err => res.status(500).json(`An error has occured. Error: ${err.message}`));
      // Convert the data from the API into a more readable object format
      cases = {
        total: result.TotalConfirmed,
        deaths: result.TotalDeaths,
        recovered: result.TotalRecovered
      }
      // Create a timer that clears the cache after 5 minutes.
      setTimeout(() => {
        cases = {};
      }, CACHE_EXPIRY_TIME)
    }

    res.status(200).json(cases);
  });
}