const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {

  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  const savedAssessment = await Assessment.create(assessment);
  return savedAssessment;
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll({
    order: [[ `id` ]],
  });
  return assessments;
};
