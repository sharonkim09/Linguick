const router = require("express").Router();
// const questionRoutes = require("./question");
const userRoutes = require("./user");
const quizRoutes = require("./quiz");
// const quizRoutes = require("./quiz");

// Post routes
// router.use("/question", questionRoutes);
router.use("/user", userRoutes);
router.use("/quiz", quizRoutes);
// router.use("/quiz", quizRoutes);

module.exports = router;
