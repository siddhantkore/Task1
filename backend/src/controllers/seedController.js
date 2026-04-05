const { seedReferenceData } = require('../utils/seedData');

const seedData = async (req, res, next) => {
  try {
    const seededCounts = await seedReferenceData();

    res.status(201).json({
      message: 'Reference data seeded successfully',
      seededCounts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  seedData,
};
