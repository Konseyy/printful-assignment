const quizes = [
	{
		id: 1,
		title: "Latvian trivia",
	},
	{
		id: 2,
		title: "Quizy quiz"
	}
]
const questions = [
	{
		id: 1,
		quiz: 1,
		title: "On which date does Latvia celebrate independence?",
	},
	{
		id: 2,
		quiz: 1,
		title: "When was the earliest historical record of the Latvian flag?",
	},
	{
		id: 3,
		quiz: 1,
		title: "Of the four countries which share a land border with Latvia, which is closest in size to Latvia?",
	},
	{
		id: 4,
		quiz: 2,
		title: "Which of these is the correct spelling of the word?",
	},
	{
		id: 5,
		quiz: 2,
		title: "Pupaphobia is the fear of what?",
	}
]
const answers = [
	{
		id: 1,
		question: 1,
		title: "May 4th"
	},
	{
		id: 2,
		question: 1,
		title: "April 1st"
	},
	{
		id: 3,
		question: 1,
		title: "November 18th"
	},
	{
		id: 4,
		question: 1,
		title: "March 16th"
	},
	{
		id: 5,
		question: 2,
		title: "11th century"
	},
	{
		id: 6,
		question: 2,
		title: "12th century"
	},
	{
		id: 7,
		question: 2,
		title: "13th century"
	},
	{
		id: 8,
		question: 2,
		title: "14th century"
	},
	{
		id: 9,
		question: 2,
		title: "15th century"
	},
	{
		id: 10,
		question: 3,
		title: "Estonia"
	},
	{
		id: 11,
		question: 3,
		title: "Belarus"
	},
	{
		id: 12,
		question: 3,
		title: "Russia"
	},
	{
		id: 13,
		question: 3,
		title: "Lithuania"
	},
	{
		id: 14,
		question: 4,
		title: "Sacrilegious"
	},
	{
		id: 15,
		question: 4,
		title: "Sacriligious"
	},
	{
		id: 16,
		question: 4,
		title: "Sacreligious"
	},
	{
		id: 17,
		question: 4,
		title: "Sacreligous"
	},
	{
		id: 18,
		question: 5,
		title: "Beans"
	},
	{
		id: 19,
		question: 5,
		title: "Puppets"
	},
	{
		id: 20,
		question: 5,
		title: "Puppies"
	},

]
const correct_answers = [
	{
		quiz: 1,
		answers: [
			3, 6, 13
		]
	},
	{
		quiz: 2,
		answers: [
			14, 19
		]
	}
]
exports.data = {
	quizes, questions, answers, correct_answers
}