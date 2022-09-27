import logo from './logo.svg';
import './App.css';
import { getMonth } from './util'
import { useState, useContext, useEffect } from 'react';
import Month from './Month'
import CalenderHeader from './CalenderHeader';
import GlobalContext from './context/GlobalContext';
import SideBar from './SideBar';
import EventModal from "./EventModal";
import './style.css'

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <div className="App">
      {showEventModal && <EventModal />}
      <CalenderHeader></CalenderHeader>
      <div className='below-header'>
        <SideBar></SideBar>
        <Month month={currentMonth}></Month>
      </div>
    </div>
  );
}

export default App;
