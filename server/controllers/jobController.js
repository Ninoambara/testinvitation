const axios = require("axios");

class JobController {
  static async findAllJob(req, res, next) {
    try {
      const { description, location, full_time, page } = req.query;
      let apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions.json?`;

      // Check if any query parameters are provided
      const queryParams = [];

      if (description) {
        queryParams.push(`description=${description}`);
      }

      if (location) {
        queryParams.push(`location=${location}`);
      }

      if (full_time) {
        queryParams.push(`full_time=${full_time}`);
      }

      if (page && !isNaN(page)) {
        queryParams.push(`page=${page}`);
      }

      // Add the query parameters to the URL
      apiUrl += queryParams.join("&");

      console.log(apiUrl);
      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  static async findById(req, res, next) {
    try {
      const jobId = req.params.id;
      const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions/${jobId}`;

      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

module.exports = JobController;
