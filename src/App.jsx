import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [turn, setTurn] = useState("");

  const people = ["Yash", "Deshmukh", "Durgesh"];

  const date = new Date();
  const day = date.getDay();

  // Function to calculate the week number
  const getWeekNumber = (d) => {
    const start = new Date(d.getFullYear(), 0, 1);
    const diff = Math.floor((d - start) / (1000 * 60 * 60 * 24));
    return Math.ceil((diff + start.getDay() + 1) / 7);
  };

  const getdata = async () => {
    try {
        const response = await fetch('http://localhost:3000/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  useEffect(() => {
    if (day === 1 || day === 5) { // Monday or Friday
      const weekNumber = getWeekNumber(date);
      const index = (weekNumber - 1) % people.length;
      setTurn(people[index]);
    }

    
  }, [day, date, people]);

  return (
    <main>
      <div className="date-box"><span>Today is: {date.toDateString()}</span></div>
      {turn && <div className="turn-box">It's {turn}'s turn to go to class!</div>}
      {!turn && <div className="no-class-box">There is no chaos class today, enjoy!</div>}
      <button onClick={getdata}>getdata</button>
    </main>
  );
}
