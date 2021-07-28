import React, { useState, useEffect } from "react";
import "../../Pages/Home/Home.css";
import useSound from "use-sound";
import correct from "../../sounds/correct.mp3";
import play from "../../sounds/play.mp3";
import wait from "../../sounds/wait.mp3";
import wrong from "../../sounds/wrong.mp3";
const Quiz = ({ data, setStop, questionNumber, setQuestionNumber }) => {
 
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [answerName, setanswerName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [PleaseWait] = useSound(wait);
  const [wrongAnswer] = useSound(wrong);
  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick = (item) => {
    setselectedAnswer(item);
    setanswerName("answer active");
    delay(3000, () =>
      setanswerName(item.correct ? "answer correct" : "answer wrong")
    );
    delay(6000, () => {
      if (item.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setselectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => setStop(true));
      }
    });
  };
  return (
    <div className="quiz">
      <div className="questions">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((item) => {
          return (
            <div
              className={selectedAnswer === item ? answerName : "answer"}
              onClick={() => handleClick(item)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
