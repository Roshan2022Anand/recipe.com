import React from 'react'

const RecipeCard = ({ mealObj }) => {

    return (
        <>
            <div className='recipe-card'>
                <img src={mealObj.img} className='w-fit rounded-lg' />
                <div>{mealObj.name}</div>

                <details>
                    <summary>Ingredients</summary>
                    <p>
                        { }
                    </p>
                </details>
            </div>
        </>
    )
}

export default RecipeCard