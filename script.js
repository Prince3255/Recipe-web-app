const searchBox = document.querySelector('.searchBox')
const searchBtn = document.querySelector('.searchBtn')
const recipeContainer = document.querySelector('.recipeContainer')
const recipeBtn = document.querySelector('.recipeBtn')
const recipeContent = document.querySelector('.recipeContent')

const myFetch = async (value) => {
    recipeContainer.innerHTML = "<h2>Fetching..</h2>"
    try {
    const apii = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    const response = await apii.json()
    console.log(response)
    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const elem = document.createElement('div');
        elem.classList.add('recipe')
        elem.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const btn = document.createElement('button');
        btn.innerHTML = "View Recipe"
        elem.appendChild(btn)
        btn.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(elem)
    })} catch (error) {
        recipeContainer.innerHTML = "<h2>Not Found !</h2>"
    }
}

function fetchIngredients(meal) {
    let Ingredients = ""
    for(let i = 1;i<=20;i++) {
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient) {
            const measure = meal[`strMeasure${i}`]
            Ingredients += `<li>${ingredient} ${measure}</li>`
        }
        else {
            break;
        }
    }
    return Ingredients;
}

const openRecipePopup = (meal)=>{
    recipeContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <p>Instructions:</p>
        <p>${meal.strInstructions}</p>
    `
    recipeContent.parentElement.style.display = "block"
}

recipeBtn.addEventListener('click',()=>{
    recipeContent.parentElement.style.display = "none"
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    recipeContent.parentElement.style.display = "none"
    const value = searchBox.value.trim();
    if (value.length <= 0) {
        recipeContainer.innerHTML = "<h2>Please type a meal in search box</h2>";
        return;
    }
    myFetch(value);
})