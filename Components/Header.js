"use client"
import { MyContext } from '@/Helper/Context';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu';

const Header = () => {

    //accesiing data from context API
    const { setsrchMealList, setshowRandomMeal, loadOrNotFound, setloadOrNotFound } = useContext(MyContext);

    //all the states are declared here
    const [srchBordState, setsrchBordState] = useState(false);
    const [srchInput, setsrchInput] = useState("");

    //search food based on user input
    const getSrchedMealList = async (len) => {
        let tempSrchedMeal = [];
        try {
            let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${srchInput[0]}`);
            let data = res.data.meals;
            data.map((item) => {
                if (item.strMeal.slice(0, len).toLowerCase() == srchInput) {

                    //to separate the ingredients and quantity from the item obj
                    let arr = [];
                    let ingredientArr = [];
                    for (let i in item)
                        arr.push(i)
                    for (let i = 9, j = 29; i <= 28, j <= 48; i++, j++)
                        if (item[arr[i]])
                            ingredientArr.push({ name: item[arr[i]], quantity: item[arr[j]] })

                    //making a object for recipe card
                    let tempMealObj = {
                        name: item.strMeal,
                        category: item.strCategory,
                        area: item.strArea,
                        img: item.strMealThumb,
                        watch: item.strYoutube,
                        ingredient: ingredientArr
                    }
                    tempSrchedMeal.push(tempMealObj);
                }
            })
        } catch (err) {
            console.log("not found");

        }
        setsrchMealList([...tempSrchedMeal])
        if (tempSrchedMeal.length == 0) setloadOrNotFound(false)
    }

    //to check if the search bar is empty or not
    useEffect(() => {
        if (srchInput != "") {
            setshowRandomMeal(false)
            getSrchedMealList(srchInput.length);
        } else {
            setshowRandomMeal(true);
        }
    }, [srchInput])


    return (
        <>
            <nav className='bg-[var(--primary)]  flex justify-between p-2 text-2xl'>
                <div className='font-bold'>
                    <p className='logo'>Recipe.com</p></div>

                <div className='flex gap-5'>
                    <div className='flex justify-end'>
                        <input type='text' className='p-[1px] bg-[var(--background)] border-2 border-[var(--border)]' placeholder='eg.' style={{
                            display: srchBordState ? "block" : "none",
                            borderRadius: srchBordState ? "10px" : "0px"
                        }} value={srchInput} onChange={(ele) => {
                            setsrchInput(ele.target.value);
                        }} />
                        <button onClick={() => setsrchBordState(!srchBordState)} className='shadow-hover srch-btn'>🔍</button>
                    </div>
                    <Menu/>
                </div>
            </nav>
        </>
    )
}

export default Header