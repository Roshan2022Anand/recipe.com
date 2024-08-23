"use client"
import React, { createContext, useState } from 'react'
export const MyContext = createContext();
const Context = ({ children }) => {
  const [showRandomMeal, setshowRandomMeal] = useState(true)
  const [mountRandomMeal, setmountRandomMeal] = useState([]);
  const [srchMealList, setsrchMealList] = useState([]);

  return (
    <>
      <MyContext.Provider value={{ mountRandomMeal, setmountRandomMeal, srchMealList, setsrchMealList,showRandomMeal,setshowRandomMeal }}>
        {children}
      </MyContext.Provider>
    </>
  )
}

export default Context