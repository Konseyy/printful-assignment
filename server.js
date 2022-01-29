const express = require("express");
const { data } = require("./lib/data");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(cors());
app.options('*', cors());
dotenv.config();
app.get("/quizes", (req, res) => {
	res.json(data.quizes ?? []);
})
app.get("/questions", (req, res) => {
	const { quizId } = req.query;
	if (!quizId) {
		res.json({ error: "Please specify quizId" });
		return;
	}
	const questions = data.questions.filter(q => q.quiz == quizId);
	if (!questions || questions.length === 0) {
		res.json({ error: `Quiz with id ${quizId} not found` });
		return;
	}
	else {
		res.json(questions.map(q => {
			return {
				id: q.id,
				title: q.title
			}
		}))
	}
})
app.get("/answers", (req, res) => {
	const { questionId } = req.query;
	if (!questionId) {
		res.json({ error: "Please specify questionId" });
		return;
	}
	const answers = data.answers.filter(a => a.question == questionId);
	if (!answers || answers.length === 0) {
		res.json({ error: `Answers for question with id ${questionId} not found` });
		return;
	}
	else {
		res.json(answers.map(a => {
			return {
				id: a.id,
				title: a.title,
			}
		}))
	}
})
app.get("/check", (req, res) => {
	const { quizId, answers } = req.query;
	if (!quizId) {
		res.json({ error: "Please specify quizId" });
		return;
	}
	if (!answers) {
		res.json({ error: "Please specify answers" });
		return;
	}
	const correct_answers_arr = data.correct_answers.filter(c => c.quiz == quizId);
	const correct_answers = correct_answers_arr[0] ?? undefined;
	const questions = data.questions.filter(q => q.quiz == quizId).length;
	if (!questions) {
		res.json({
			error: `Quiz with id ${quizId} not found`
		});
		return;
	}
	if (!correct_answers) {
		res.json({
			error: `Correct answers for quiz with id ${quizId} not found`
		});
		return;
	}
	const correct = correct_answers.answers.reduce((prev, curr, idx) => {
		if (idx < answers.length) {
			if (curr == answers[idx]) {
				return prev + 1;
			}
		}
		return prev;
	}, 0);
	res.json({
		total: questions,
		correct: correct,
	})
})

app.listen(process.env.VUE_APP_SERVER_PORT, () => {
	console.log(`Server running on port ${process.env.VUE_APP_SERVER_PORT}`)
})