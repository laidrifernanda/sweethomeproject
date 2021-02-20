//Import data
const calendarService = require("../services/calendar");

//Module exports
module.exports = {
  browse: async (req, res) => {
    const defaultDate = new Date()
    const { year = defaultDate.getFullYear() , month = defaultDate.getMonth()+1 } = req.query;
    try {
      const calendarType = await calendarService.find(year, month);

      res.status(200).send({ data: calendarType });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
