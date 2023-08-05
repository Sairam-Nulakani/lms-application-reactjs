const express = require("express");
const { QuizModel } = require("../models/quiz.model");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.send({ msg: "All quizzes data", quizzes });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const quiz = new QuizModel(req.body);
    await quiz.save();
    return res.send({ msg: "Quiz Created", quiz });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

router.patch("/:quizId", async (req, res) => {
  const { quizId } = req.params;
  const payload = req.body;
  try {
    const quiz = await QuizModel.findByIdAndUpdate({ _id: quizId }, payload);
    const updatedQuiz = await QuizModel.find({ _id: quizId });
    res.status(200).send({ msg: "Updated Quiz", quiz: updatedQuiz[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

router.delete("/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await QuizModel.findByIdAndDelete({ _id: quizId });
    res.status(200).send({ msg: "Deleted Quiz" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;