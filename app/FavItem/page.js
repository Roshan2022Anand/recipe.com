"use client"
import React, {useEffect, useState } from 'react'
import Menu from '@/Components/Menu'
import RecipeCard from '@/Components/RecipeCard'
const page = () => {
    const [favItemList, setFavItemList] = useState([]);

    useEffect(() => {
        // Check if localStorage is available and then set the state
        const favItems = localStorage.getItem("favItemArr");
        if (favItems) {
            setFavItemList(JSON.parse(favItems));
        }
    }, []);
    return (
        <>
            <nav className='bg-[var(--primary)]  flex justify-between p-2 text-2xl'>
                <div className='font-bold w-3/4'>
                    <p className='logo'>Recipe.com</p></div>
                <Menu />
            </nav>
            <main>
                {(favItemList.length>0) ? favItemList.map((item) => {
                    console.log(item.mealObj);
                    return <RecipeCard mealObj={item.mealObj} />
                }) : console.log("No data")}
            </main>
        </>
    )
}

export default page