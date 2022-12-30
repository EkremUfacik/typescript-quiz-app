import React from "react";
import { Container, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface Props {
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setTotalQuestions: React.Dispatch<React.SetStateAction<number>>;
}

const SelectArea: React.FC<Props> = ({ setDifficulty, setTotalQuestions }) => {
  return (
    <Stack className="mx-auto gap-3">
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option disabled>Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Form.Select>

      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setTotalQuestions(Number(e.target.value))}
      >
        <option disabled>Select Number of Questions</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </Form.Select>
    </Stack>
  );
};

export default SelectArea;
