const axios = require("axios");

class JobController {
  static async findAllJob(req, res, next) {
    try {
      const { description, location, full_time, page } = req.query;
      let apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions.json?`;

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

      apiUrl += queryParams.join("&");

      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const jobId = req.params.id;
      const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions/${jobId}`;

      const response = await axios.get(apiUrl);

      if (Object.keys(response.data).length === 0) {
        throw { name: "Job not found" };
      }

      res.json(response.data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = JobController;
