//Import data
const dashboardService = require("../services/dashboard");

//Modules exports
module.exports = {
  dashboard: async (req, res) => {
    const defaultDate = new Date();
    try {
      const user = await dashboardService.data(defaultDate);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
