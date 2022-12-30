import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import QuestionsCard from "./components/QestionsCard";
import Button from "react-bootstrap/esm/Button";
import SelectArea from "./components/SelectArea";

// enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

function App() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  const getQuiz = async (amount: number, difficulty: string) => {
    setStart(true);
    setLoading(true);
    const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setLoading(false);
  };

  // useEffect(() => {
  //   getQuiz();
  // }, []);

  console.log(totalQuestions);
  console.log(difficulty);

  return (
    <Stack>
      <h2>QUIZ GAME</h2>
      {!start && (
        <Stack>
          <SelectArea
            setDifficulty={setDifficulty}
            setTotalQuestions={setTotalQuestions}
          />
          <Button
            variant="info"
            onClick={() => getQuiz(totalQuestions, difficulty)}
          >
            Start
          </Button>
        </Stack>
      )}

      {start && (
        <QuestionsCard
          questions={questions[questionNum]}
          questionNum={questionNum}
          setQuestionNum={setQuestionNum}
          totalQuestions={totalQuestions}
          setStart={setStart}
          loading={loading}
        />
      )}
    </Stack>
  );
}

export default App;
