
import { MyContext } from '@/Helper/Context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const Header = () => {

    //accesiing data from context API
    const { setmountRandomMeal, setsrchMealList, setshowRandomMeal } = useContext(MyContext);
    //accesing the router method from next
    const router = useRouter();

    //all the states are declared here
    const [srchBordState, setsrchBordState] = useState(false);
    const [webTheme, setwebTheme] = useState(true);
    const [srchInput, setsrchInput] = useState("");

    //dark and light mode effect
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary", webTheme ? '#27403E' : '#A8D5BA');
        root.style.setProperty("--secondary", webTheme ? '#2B1C1D' : '#F7E7CE');
        root.style.setProperty("--accent", webTheme ? '#803D3D' : '#FF6F61');
        root.style.setProperty("--text", webTheme ? '#E0E0E0' : '#2F4F4F');
        root.style.setProperty("--background", webTheme ? '#1A1A1A' : '#cbccc7');
        root.style.setProperty("--highlight", webTheme ? '#8F6500' : '#FFC107');
        root.style.setProperty("--border", webTheme ? '#364640' : '#C4D1C8');
    }, [webTheme])


    //             let res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.
    //             //to take out the ingredient and mesure from the meal object
    //             let arr = [];
    //             let ingredientArr = [];
    //             for (let i in res.data.meals[0])
    //                 arr.push(i)

    //             for (let i = 9, j = 29; i <= 28, j <= 48; i++, j++) {
    //                 if (data[arr[i]])
    //                     ingredientArr.push({ name: data[arr[i]], quantity: data[arr[j]] })
    //             }

    //             let tempMealObj = {
    //                 name: data.strMeal,
    //                 category: data.strCategory,
    //                 area: data.strArea,
    //                 img: data.strMealThumb,
    //                 watch: data.strYoutube,
    //                 ingredient: ingredientArr
    //             }
    //             tempRandomMeal.push(tempMealObj);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     setmountRandomMeal([...tempRandomMeal])
    // }

    const getSrchedMealList = async (len) => {
        let tempSrchedMeal = [];
        try {
            let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${srchInput[0]}`);
            let data = res.data.meals;
            data.map((item) => {
                if (item.strMeal.slice(0, len).toLowerCase() == srchInput) {
                    console.log(true);
                    let tempMealObj = {
                        name: item.strMeal,
                        category: item.strCategory,
                        area: item.strArea,
                        img: item.strMealThumb,
                        watch: item.strYoutube,
                        // ingredient: ingredientArr
                    }
                    tempSrchedMeal.push(tempMealObj);

                }
            })
        } catch (err) {
            console.log("not found");

        }
        if (tempSrchedMeal.length > 0)
            setsrchMealList([...tempSrchedMeal])
        else
        console.log("not found");
        
    }

    //search food based on user input
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
                <div className='font-bold'>Recipe.com</div>

                <div className='flex gap-5'>
                    <div className='flex justify-end'>
                        <input type='text' className='p-[1px] bg-[var(--background)] border-2 border-[var(--border)]' placeholder='eg.' style={{
                            display: srchBordState ? "block" : "none",
                            borderRadius: srchBordState ? "10px" : "0px"
                        }} value={srchInput} onChange={(ele) => {
                            setsrchInput(ele.target.value);
                        }} />
                        <button onClick={() => setsrchBordState(!srchBordState)} className='srch-btn'>🔍</button>
                    </div>
                    <button onClick={() => setwebTheme(!webTheme)}>
                        {webTheme ? '🌙' : '☀️'}
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Header