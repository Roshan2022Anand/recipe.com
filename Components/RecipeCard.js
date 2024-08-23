import React from 'react'

const RecipeCard = ({ mealObj }) => {

    return (
        <>
            <div className='recipe-card'>
                <div className='w-1/3 h-[20vw] '>
                    <img src={mealObj.img} className='w-full h-full object-contain rounded-lg ' />

                </div>
                <div className='grow border-[var(--border)] border-2'>
                    <div>{mealObj.name}</div>

                    <details>
                        <summary>Ingredients</summary>
                        <p>
                            {JSON.stringify(mealObj.ingredient)}
                        </p>
                    </details>
                </div>
            </div>
        </>
    )
}

export default RecipeCard