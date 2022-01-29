const quizes = [
	{
		id: 1,
		title: "Test test 1",
	}
]
const questions = [
	{
		id: 1,
		quiz: 1,
		title: "Which of these is the smallest number",
	},
	{
		id: 2,
		quiz: 1,
		title: "Which of these is the biggest number",
	}
]
const answers = [
	{
		id: 1,
		question: 1,
		title: "1"
	},
	{
		id: 2,
		question: 1,
		title: "3"
	},
	{
		id: 3,
		question: 1,
		title: "4"
	},
	{
		id: 4,
		question: 1,
		title: "5"
	},
	{
		id: 5,
		question: 2,
		title: "2"
	},
	{
		id: 6,
		question: 2,
		title: "3"
	},
	{
		id: 7,
		question: 2,
		title: "4"
	},
	{
		id: 8,
		question: 2,
		title: "5"
	},
]
const correct_answers = [
	{
		quiz: 1,
		answers: [
			1, 8
		]
	}
]
exports.data = {
	quizes, questions, answers, correct_answers
}