// CommonContext.jsx
import React, { createContext, useState } from "react";

// 1. Create the context
export const CommonContext = createContext();

// 2. Create the provider component
export const CommonProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userName, setUserName] = useState("himanshu-jasuja");
  const [compiledSchedule,setCompiledSchedule]=useState([])
  return (
    <CommonContext.Provider value={{ selectedDate, setSelectedDate, userName, setUserName,setCompiledSchedule,compiledSchedule }}>
      {children}
    </CommonContext.Provider>
  );
};
