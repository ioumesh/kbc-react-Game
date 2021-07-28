import React, { useState, useEffect } from "react";
import "./Home.css";
import moneyData from "../../Components/Data/MoneyData";
import Data from "../../Components/Data/Questions";
import Timer from "../../Components/Timer/Timer";
import Quiz from "../../Components/Quiz/Quiz";
import Start from "../../Components/Start/Start";

const Home = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setearned] = useState("Rs 0");
  const [user, setUser] = useState('');

  useEffect(() => {
    questionNumber > 1 &&
      setearned(
        moneyData.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber]);
  return (
    <div className="Container">
      {user ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="textCenter">Dear {user} you have Earned :{earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <h2 style={{textAlign:'center'}}>Welcome {user}</h2>
                  <Quiz
                    data={Data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyData.map((item, index) => {
                return (
                  <li
                    className={
                      questionNumber === item.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                    key={index}
                  >
                    <span className="moneyListItemNumber">{item.id}</span>
                    <span className="moneyListItemAmount">{item.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUser={setUser} />
      )}
    </div>
  );
};

export default Home;
