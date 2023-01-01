import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import QuestionsCard from "./components/QestionsCard";
import Button from "react-bootstrap/esm/Button";
import SelectArea from "./components/SelectArea";
import { Container } from "react-bootstrap";

function App() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const getQuiz = async (amount: number, difficulty: string) => {
    setStart(true);
    setLoading(true);
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setLoading(false);
  };

  return (
    <Container
      className="d-flex flex-column text-center gap-3 w-50 py-5 align-items-center justify-content-center bg-light shadow rounded"
      style={{ minWidth: "23rem" }}
    >
      <h2>QUIZ GAME</h2>
      {!start && (
        <div className="">
          <SelectArea
            setDifficulty={setDifficulty}
            setTotalQuestions={setTotalQuestions}
          />
          <Button
            size="lg"
            className="mt-3"
            variant="info"
            onClick={() => getQuiz(totalQuestions, difficulty)}
          >
            Start
          </Button>
        </div>
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
    </Container>
  );
}

export default App;
