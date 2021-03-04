//Import data
const showcaseService = require("../services/showcaseServices");
const filter = require("../helper/filter");
const { RefConstraintError } = require("mongoose-references-integrity-checker");

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
    const { page = 1, limit = 10, ...location } = req.query;
    const locationId = await filter.locations(location);
    // console.log(locationId, "ini location dari filter");
    const status = "Completed project";
    try {
      const project = await showcaseService.findLocation(
        +page,
        +limit,
        status,
        locationId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  locationProfile: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...location } = req.query
    const locationId = await filter.locations(location);
    const status = "Portofolio";
    try {
      const project = await showcaseService.findLocation(
        +page,
        +limit,
        status,
        locationId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  styleProject: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...style } = req.query;
    const styleId = await filter.styles(style);
    const status = "Completed project";
    try {
      const project = await showcaseService.findStyle(
        +page,
        +limit,
        status,
        styleId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  stylePortofolio: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...style } = req.query;
    const styleId = await filter.styles(style);
    const status = "Portofolio";
    try {
      const project = await showcaseService.findStyle(
        +page,
        +limit,
        status,
        styleId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  locationShowcase: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...location } = req.query;
    const locationId = await filter.locations(location);
    try {
      const project = await showcaseService.findLocationShowcase(
        +page,
        +limit,
        locationId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  styleShowcase: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...style } = req.query;
    const styleId = await filter.styles(style);
    try {
      const project = await showcaseService.findStyleShowcase(
        +page,
        +limit,
        styleId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  bothProject: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...id } = req.query;
    const filterId = await filter.both(id);
    const status = "Completed project";
    try {
      const project = await showcaseService.both(
        +page,
        +limit,
        status,
        filterId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  bothProfile: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...id } = req.query;
    const filterId = await filter.both(id);
    // console.log(filterId, "ini filterId");
    const status = "Portofolio";
    try {
      const project = await showcaseService.both(
        +page,
        +limit,
        status,
        filterId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  bothShowcase: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10, ...id } = req.query;
    const filterId = await filter.both(id);
    try {
      const project = await showcaseService.bothShowcase(
        +page,
        +limit,
        filterId
      );

      //get total documents
      const pageInfo = await showcaseService.getPagination(+page, +limit);
      const message = "what you filter was not found";

      if (project.length === 0) {
        res.status(200).send({ data: project, message: message, ...pageInfo });
      } else {
        res.status(200).send({ data: project, ...pageInfo });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  love: async (req, res) => {
    const { user } = req;
    const { showcaseId } = req.params;

    const matchData = await showcaseService.match(showcaseId, user._id);
    if (!matchData) {
      try {
        const favoriteData = await showcaseService.love(showcaseId, user._id);
        res.status(200).send({ data: favoriteData });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    } else {
      res.status(400).send({ error: "Already favorite" });
    }
  },
  deleteLove: async (req, res) => {
    try {
      const { user } = req;
      const { showcaseId } = req.params;

      await showcaseService.deleteLove(showcaseId, user._id);

      res.status(200).send({ data: false });
    } catch (err) {
      if (err instanceof RefConstraintError === true) {
        res.status(400).json({ message: "Cannot delete" });
      }
      res.status(400).json({ error: err.message });
    }
  },
};
