const fs = require('fs');

function creatingQuiz(path) {
  let reading = fs.readFileSync(path, 'utf-8');

  reading = reading.split('\r\n').filter(Boolean);

  let topic = [];

  for (let i = 0; i < reading.length; i += 2) {
    topic.push([reading[i], reading[i + 1]]);
  }

  topic = topic.map((el) => {
    const question = el[0];
    const answer = el[1];
    return { question, answer };
  });

  return topic;
}

const nighthawk = creatingQuiz('./topics/nighthawk_flashcard_data.txt')
const dota = creatingQuiz('./topics/dota2.txt')
const js = creatingQuiz('./topics/js_questions.txt')
const raccoon = creatingQuiz('./topics/raccoon_flashcard_data.txt')

const quiz = {
    'Ястребы': nighthawk,
    'Dota 2':dota,
    'JavaScript':js,
    'Еноты':raccoon
}

module.exports = quiz
