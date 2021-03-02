//Import data
const showcaseService = require("../services/showcaseServices");
const filter = require("../helper/filter")

//module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const project = await showcaseService.findAll(+page, +limit);

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { showcaseId } = req.params;
      const showcase = await showcaseService.findId(showcaseId);

      res.status(200).send({ data: showcase });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  project: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const status = "Completed project";
    try {
      const project = await showcaseService.find(+page, +limit, status);

      //get total documents
      const pageInfo = await showcaseService.getPaginationByProject(
        +page,
        +limit,
        status
      );

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  profile: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const status = "Portofolio";
    try {
      const project = await showcaseService.find(+page, +limit, status);

      //get total documents
      const pageInfo = await showcaseService.getPaginationByProject(
        +page,
        +limit,
        status
      );

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  search: async (req, res) => {
    const { query } = req.query;
    try {
      const searchData = await showcaseService.search(query);

      res.status(200).send({ data: searchData });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  locationProject: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const {query} = req
    const location = {...query}
    const locationId = await filter.locations(location)
    console.log(locationId, "ini location dari filter")
    const status = "Completed project"
    try {
      const project = await showcaseService.findLocation(+page, +limit, status, locationId);

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found"

      if(project.length === 0){
        res.status(200).send({data:project,message: message, ...pageInfo})
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  locationProfile: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const {query} = req
    const location = {...query}
    const locationId = await filter.locations(location)
    // console.log(locationId, "ini location dari filter")
    const status = "Portofolio"
    try {
      const project = await showcaseService.findLocation(+page, +limit, status, locationId);

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found"

      if(project.length === 0){
        res.status(200).send({data:project,message: message, ...pageInfo})
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  styleProject: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const {query} = req
    const style = {...query}
    const styleId = await filter.styles(style)
    // console.log(styleId, "ini style dari filter")
    const status = "Completed project"
    try {
      const project = await showcaseService.findStyle(+page, +limit, status, styleId);

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found"

      if(project.length === 0){
        res.status(200).send({data:project,message: message, ...pageInfo})
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  stylePortofolio: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const {query} = req
    const style = {...query}
    const styleId = await filter.styles(style)
    // console.log(styleId, "ini style dari filter")
    const status = "Portofolio"
    try {
      const project = await showcaseService.findStyle(+page, +limit, status, styleId);

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found"

      if(project.length === 0){
        res.status(200).send({data:project,message:message, ...pageInfo})
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  love: async (req, res) => {
    const { user } = req;
    const { showcaseId } = req.params

    try {
      const favoriteData = await showcaseService.love(showcaseId, {
        _id: user._id,
      });
      res.status(200).send({ data: favoriteData });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
