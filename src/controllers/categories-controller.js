const { sendErrorResponse } = require('../helpers/errors');
const CategoryModel = require('../models/category-model');
const createCategoryViewModel = require('../view-models/create-category-view-model');

const fetchAll = async (req, res) => {
  try {
    const categoryDocuments = await CategoryModel.find();

    res.status(200).json(categoryDocuments.map(createCategoryViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
};
