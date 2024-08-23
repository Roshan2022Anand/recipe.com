"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from '@/Components/Header'
import axios from 'axios'
import RecipeCard from '@/Components/RecipeCard'
import { MyContext } from '@/Helper/Context'
import NotFound from '@/Components/NotFound'
import Loading from '@/Components/Loading'

const page = () => {

  const { showRandomMeal, srchMealList, loadOrNotFound, setloadOrNotFound } = useContext(MyContext);


  const [mountRandomMeal, setmountRandomMeal] = useState([]);

  //setting up the initial recipe cards 
  useEffect(() => {
    const getData = async () => {
      let tempRandomMeal = [];
      for (let i = 0; i < 20; i++) {
        try {
          let res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
          let data = res.data.meals[0];

          //to take out the ingredient and mesure from the meal object
          let arr = [];
          let ingredientArr = [];
          for (let i in res.data.meals[0])
            arr.push(i)

          for (let i = 9, j = 29; i <= 28, j <= 48; i++, j++) {
            if (data[arr[i]])
              ingredientArr.push({ name: data[arr[i]], quantity: data[arr[j]] })
          }

          let tempMealObj = {
            name: data.strMeal,
            category: data.strCategory,
            area: data.strArea,
            img: data.strMealThumb,
            watch: data.strYoutube,
            ingredient: ingredientArr
          }
          tempRandomMeal.push(tempMealObj);
        } catch (err) {
          console.log(err);
        }
      }
      setmountRandomMeal([...tempRandomMeal])
    }
    getData();
  }, [])

  //showing weather random  or searched meal
  let mealList = [];
  if (showRandomMeal) mealList = mountRandomMeal;
  else mealList = srchMealList;
  return (
    <>
      <Header />
      <main className='flex flex-col  gap-3 h-screen p-4'>
        {(mealList.length > 0) ? mealList.map((ele) => {
          return <RecipeCard mealObj={ele} />
        }) : (loadOrNotFound) ? <Loading /> : <NotFound />}
      </main>
    </>
  )
}

export default page