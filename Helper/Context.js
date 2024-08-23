"use client"
import React, { createContext, useState } from 'react'
export const MyContext = createContext();
const Context = ({ children }) => {
  const [showRandomMeal, setshowRandomMeal] = useState(true);
  const [srchMealList, setsrchMealList] = useState([]);
  const [loadOrNotFound, setloadOrNotFound] = useState(true)

  return (
    <>
      <MyContext.Provider value={{ srchMealList, setsrchMealList,showRandomMeal,setshowRandomMeal,loadOrNotFound,setloadOrNotFound }}>
        {children}
      </MyContext.Provider>
    </>
  )
}

export default Context