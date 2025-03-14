const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const quiz = require('./creatingQuiz');

function chooseTopic() {
  console.log('Выберите тему:');
  const topics = Object.keys(quiz);
  topics.forEach((topic, index) => {
    console.log(`${index + 1}. ${topic}`);
  });

  rl.question('Введите номер темы: ', (answer) => {
    const topicIndex = parseInt(answer, 10) - 1;
    if (topicIndex >= 0 && topicIndex < topics.length) {
      const selectedTopic = topics[topicIndex];
      console.log(`Вы выбрали тему: ${selectedTopic}`);
      startQuiz(selectedTopic);
    } else {
      console.log('Неверный выбор. Попробуйте снова.');
      chooseTopic();
    }
  });
}

function startQuiz(topic) {
  const questions = quiz[topic];
  let score = 0;

  function askQuestion(index) {
    if (index < questions.length) {
      const currentQuestion = questions[index];
      rl.question(`${currentQuestion.question}\nВаш ответ: `, (userAnswer) => {
        if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
          console.log('Правильно!\n');
          score++;
        } else {
          console.log(`Неправильно. Правильный ответ: ${currentQuestion.answer}\n`);
        }
        askQuestion(index + 1);
      });
    } else {
      console.log(`Игра окончена. Ваш результат: ${score} из ${questions.length}`);
      rl.close();
    }
  }

  askQuestion(0);
}

chooseTopic();
