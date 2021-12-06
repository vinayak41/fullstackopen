import { useState } from "react";

//fedback button component
const FeedBackButton = ({ label, handleClick }) => {
  return <button onClick={handleClick}>{label}</button>;
};

//statistic line component
const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

//statistics component
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(2);
  const positive = `${((good / all) * 100).toFixed(2)} %`;
  return (
    <div>
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <table>
          <tbody>
            <StatisticLine label={"good"} value={good} />
            <StatisticLine label={"neutral"} value={neutral} />
            <StatisticLine label={"bad"} value={bad} />
            <StatisticLine label={"all"} value={all} />
            <StatisticLine label={"average"} value={average} />
            <StatisticLine label={"positive"} value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGood = () => {
    setGood((prevState) => prevState + 1);
  };
  const handleSetNeutral = () => {
    setNeutral((prevState) => prevState + 1);
  };
  const handleSetBad = () => {
    setBad((prevState) => prevState + 1);
  };

  return (
    <div className="App">
      <h1>give feedback</h1>
      <FeedBackButton handleClick={handleSetGood} label={"good"} />
      <FeedBackButton handleClick={handleSetNeutral} label={"neutral"} />
      <FeedBackButton handleClick={handleSetBad} label={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
