`use-strict`;

const getMealBtn = document.querySelector(".header__container--btn");
const headerContainer = document.querySelector(".header__container");
const mealContainer = document.querySelector(".meal");

const getData = async function () {
  try {
    //API request calls
    const request = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    //getting the actual data
    const data = await request.json();

    //generate html to display data
    generateMarkup(data);
  } catch (error) {
    console.error(`${error.message} 💣💣💣 `);
  }
};

const generateMarkup = function ({ meals }) {
  // data: strMeal, strArea, strCategory, strInstructions,
  // strIngredient[i], strYoutube

  // destructure data fetched for easier usage
  const {
    strMeal,
    strArea,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube,
  } = meals[0];

  // Getting the keys and values of ingredient and measurements data and storing it in an array
  let newIngArr = [];
  let newMeasArr = [];

  Object.keys(meals[0]).forEach((el, i) => {
    for (let i = 1; i <= 20; i++) {
      if (el === `strIngredient${i}`) {
        const ing = Object.values(meals[0][el]).join("");
        if (ing === "") return;
        newIngArr.push(ing);
      }

      if (el === `strMeasure${i}`) {
        const measure = Object.values(meals[0][el]).join("");
        if (measure === " ") return;
        newMeasArr.push(measure);
      }
    }
  });

  // html template
  const html = `
    <div class="meal__container">
        <div class="meal__container--top">
            <div class="meal__container--top--left">
                <img class="meal__img" src="${strMealThumb}" alt="${strMeal}" />
                <h5>Category: ${strCategory}</h5>
                <h5>Area: ${strArea}</h5>
                <h3>Ingredients:</h3>
                <ul class="ingItem">
                    ${newIngArr
                      .map((ing, i) => `<li>${ing} - ${newMeasArr[i]}</li>`)
                      .join("")} 
                </ul>
            </div>
            <div class="meal__container--top--right">
                <h1>${strMeal}</h1>
                <p>${strInstructions}</p>
            </div>
        </div>
        <div class="meal__container--bot">
            <iframe src="https://www.youtube.com/embed/${strYoutube.slice(
              -11
            )}"}"></iframe>
        </div>
    </div>
  `;

  // display data to the user
  mealContainer.innerHTML = html;
};

getMealBtn.addEventListener("click", getData);
