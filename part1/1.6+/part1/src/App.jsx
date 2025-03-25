import { useState } from 'react';

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return <p>No feedback given</p>
  }

  return (
    <table>
      <thead>
        <StatisticLine text="good" num={props.good}/>
        <StatisticLine text="neutral" num={props.neutral}/>
        <StatisticLine text="bad" num={props.bad}/>
        <StatisticLine text="all" num={props.all}/>
        <StatisticLine text="average" num={props.avg}/>
        <StatisticLine text="positive" num={props.positive} percent="%"/>
      </thead>
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.btn}>{props.text}</button>;
}

const StatisticLine = (props) => {
  return(
      <tr>
        <td>{props.text}</td>
        <td>{props.num} {props.percent}</td>
      </tr>
  )
}

const Title = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Statst = () => {
  return (
    <h1>statistics</h1>
  )
}



const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = all === 0 ? 0 : (good - bad) / all; 
  const positive = all === 0 ? 0 : (good * 100) / all;

  const goodbtn = () => {
    setGood(good +1)
  } 

  const neutralbtn = () => {
    setNeutral(neutral +1)
  } 

  const badbtn = () => {
    setBad(bad +1)
  } 

  return (
    <div>
      <Title/>
      <Button btn={goodbtn} text="good"/>
      <Button btn={neutralbtn} text="neutral"/>
      <Button btn={badbtn} text="bad"/>
      <Statst/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positive={positive} 
      />
    </div>
  );
};

export default App;
