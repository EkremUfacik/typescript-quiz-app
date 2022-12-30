import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
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
  const [correct, setCorrect] = useState(false);
  const [click, setClick] = useState(false);
  const [answers, setAnswers] = useState<string[]>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClick(true);
    // e.currentTarget.style.backgroundColor = "red";
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

  return (
    <>
      {loading && <h5>Loading...</h5>}
      {!loading && (
        <Stack>
          <p>
            Question {questionNum + 1} / {totalQuestions}
          </p>
          <p>{questions?.question}</p>
          {answers?.map((answer, index) => (
            <Button
              key={index}
              disabled={click}
              value={answer}
              variant="outline-secondary"
              onClick={handleClick}
              className={
                click && answer == questions.correct_answer
                  ? "bg-success"
                  : "bg-dark"
              }
            >
              {answer}
            </Button>
          ))}

          {questionNum + 1 !== totalQuestions && (
            <Button onClick={handleNext}>Next Question</Button>
          )}

          {questionNum + 1 === totalQuestions && click && (
            <Button onClick={handleRestart}>Restart</Button>
          )}
        </Stack>
      )}
    </>
  );
};

export default QestionsCard;
