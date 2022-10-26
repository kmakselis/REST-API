const createCategoryViewModel = (categoryDoc) => ({
  id: categoryDoc._id.toString(),
  title: categoryDoc.title,
  image: categoryDoc.image,
});

module.exports = createCategoryViewModel;
