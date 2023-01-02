import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

interface Props {
  questions: QuestionState;
  questionNum: number;
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>;
  totalQuestions: number;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

const QestionsCard: React.FC<Props> = ({
  questions,
  questionNum,
  setQuestionNum,
  totalQuestions,
  setStart,
  loading,
}) => {
  const [click, setClick] = useState(false);
  const [answers, setAnswers] = useState<string[]>();
  const [score, setScore] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClick(true);
    e.currentTarget.value === questions.correct_answer && setScore(score + 1);
  };

  const handleNext = () => {
    click && setQuestionNum(questionNum + 1);
    click && setClick(false);
  };

  const handleRestart = () => {
    setStart(false);
    setQuestionNum(0);
    setClick(false);
  };

  console.log(questions);

  useEffect(() => {
    questions &&
      setAnswers(
        [...questions.incorrect_answers, questions.correct_answer].sort(
          () => Math.random() - 0.5
        )
      );
  }, [questions]);

  console.log(questions?.question);

  const newQuestion = questions?.question
    .replaceAll("&quot;", "`")
    .replaceAll("&#039;", "'");

  console.log(newQuestion);

  return (
    <>
      {loading && <h5>Loading...</h5>}
      {!loading && (
        <div className="d-flex flex-column w-75" style={{ maxWidth: "35rem" }}>
          <p>
            Score: <span>{score}</span>
          </p>
          <p>
            Question {questionNum + 1} / {totalQuestions}
          </p>

          <h4 className="pb-2">{newQuestion}</h4>
          {answers?.map((answer, index) => (
            <Button
              size="lg"
              key={index}
              disabled={click}
              value={answer}
              variant="outline-dark"
              onClick={handleClick}
              className={
                click && answer === questions.correct_answer ? "bg-success" : ""
              }
            >
              {answer}
            </Button>
          ))}

          {questionNum + 1 !== totalQuestions && (
            <Button variant="info" size="lg" onClick={handleNext}>
              Next Question
            </Button>
          )}

          {questionNum + 1 === totalQuestions && click && (
            <Button variant="warning" size="lg" onClick={handleRestart}>
              Restart
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default QestionsCard;
