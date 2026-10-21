
// Banco de perguntas gerado a partir dos dados anatômicos cadastrados em facts.js.
// Cada questão recebe alternativas de mesma categoria e o índice correto é calculado
// depois da mistura, evitando o erro de gabarito da versão anterior.
const questionBank = [];

function shuffleArray(input) {
  const a = input.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function addQuestion(question, correctAnswer, alternatives, difficulty, explanation, hint, category) {
  const uniqueWrong = [...new Set(alternatives.filter(x => x && x !== correctAnswer))];
  const options = shuffleArray([correctAnswer, ...shuffleArray(uniqueWrong).slice(0, 3)]);
  questionBank.push({
    question, options, answer: options.indexOf(correctAnswer),
    difficulty, explanation, hint, category
  });
}

facts.forEach((muscle, index) => {
  const otherFacts = facts.filter((f) => f.m !== muscle.m);
  const distractors = (field, correct) =>
    [...new Set(otherFacts.map((f) => f[field]).filter((v) => v && v !== correct))];

  addQuestion(
    `Qual é a origem descrita para o músculo ${muscle.m}?`,
    muscle.r, distractors("r", muscle.r), muscle.d,
    `Origem de ${muscle.m}: ${muscle.r}.`,
    "Lembre-se de que origem costuma indicar o ponto de fixação relativamente mais estável.",
    "origem"
  );
  addQuestion(
    `Qual é a inserção descrita para o músculo ${muscle.m}?`,
    muscle.i, distractors("i", muscle.i), muscle.d,
    `Inserção de ${muscle.m}: ${muscle.i}.`,
    "Pense no ponto de fixação associado ao movimento do músculo.",
    "inserção"
  );
  addQuestion(
    `Qual função está associada ao músculo ${muscle.m}?`,
    muscle.f, distractors("f", muscle.f), muscle.d,
    `Função de ${muscle.m}: ${muscle.f}.`,
    "Relacione a posição do músculo com o movimento que ele pode produzir.",
    "função"
  );
  addQuestion(
    `A qual região anatômica o músculo ${muscle.m} está associado neste material?`,
    muscle.g, [...new Set(otherFacts.map(f => f.g))].filter(g => g !== muscle.g), muscle.d,
    `Região indicada para ${muscle.m}: ${muscle.g}.`,
    "Considere a localização principal do músculo no corpo.",
    "região"
  );
});

// Validação simples do banco para evitar questões sem 4 alternativas ou gabarito inválido.
for (const q of questionBank) {
  if (q.options.length !== 4 || new Set(q.options).size !== 4 ||
      q.answer < 0 || q.answer > 3 || q.options[q.answer] === undefined) {
    throw new Error(`Questão inválida no banco: ${q.question}`);
  }
}
