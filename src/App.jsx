import { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/loginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/logoutButton";

export default function App() {
  const [turn, setTurn] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isLoggedIn , setLog]  = useState(false);
  const [users, setUsers] = useState([]);
  const [lastAttendedClass, setLastAttendedClass] = useState(null);
  const people = ["Yash", "Deshmukh", "Durgesh"];

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/user');
      const data = await response.json();
      setUsers(data.users);
      setLastAttendedClass(data.lastAttendedClass);
      determineTurn(data.lastAttendedClass);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const determineTurn = (lastClass) => {
    const today = new Date().getDay();
    const index = (lastClass + 1) % people.length;
    setTurn(people[index]);
  };

  const markAttendance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/attend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: turn.toLowerCase() }),
      });
      const data = await response.json();
      setUsers(data.users);
      setLastAttendedClass(data.lastAttendedClass);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };
  const day =  new Date().getDay()
  useEffect(() => {
    
    getUserData();
    if(user){
      setLog(true)
    } 
  }, [user]);

  return (
    <main>
      <div className="date-box"><span>Today is: {new Date().toDateString()}</span></div>
      {turn && (day === 1 || day === 4) &&<div className="turn-box">It's {turn}'s turn to go to class!</div>}
      {!(day === 1 || day === 4) && <div className="no-class-box">There is no chaos class today, enjoy!</div>}
      {isLoggedIn && (new Date().getDay() === 1 || new Date().getDay() === 4) && (
        <button onClick={markAttendance}>Mark Attendance</button>
      )}
      <div>
        <h3>Attendance Record:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}: {user.classAttended} classes attended</li>
          ))}
        </ul>
      </div>
      {!isLoggedIn && <LoginButton />}
      {isLoggedIn && <LogoutButton />}
    </main>
  );
}
