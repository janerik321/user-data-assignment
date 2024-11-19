// Header
const recipesButton = document.querySelector("#recipes-button");
const shoppingListButton = document.querySelector("#shopping-list-button");

const main = document.querySelector("#main");

// Shopping list page
const shoppingListPage = document.querySelector("#shopping-list-page");
const shoppingListAdd = document.querySelector("#shopping-list-add");
const shoppingListInput = document.querySelector("#shopping-list-input");
const shoppingList = document.querySelector("#shopping-list");

// Recipes list page
const recipeListPage = document.querySelector("#recipe-list-page");
const recipeListAdd = document.querySelector("#recipe-list-add");
const recipeListInput = document.querySelector("#recipe-list-input");
const recipeList = document.querySelector("#recipe-list");

// Recipes page
const recipePage = document.querySelector("#recipe-page");
const recipeName = document.querySelector("#recipe-name");
const deleteButton = document.querySelector("#delete-button");
const ingredientAdd = document.querySelector("#ingredient-add");
const ingredientInput = document.querySelector("#ingredient-input");
const ingredientList = document.querySelector("#ingredient-list");
const recipeInstructions = document.querySelector("#recipe-instructions");
const instructionsArea = document.querySelector("#instructions-area");
const instructionsInput = document.querySelector("#instructions-input");

const consoleLogShoppingListArray = document.querySelector(
  "#console-log-shopping-list-array"
);
const consoleLogRecipeListArray = document.querySelector(
  "#console-log-recipe-list-array"
);
// Two arrays. One for the shopping list and one for the recipes. The recipes array will contain recipe names and ingredients
let shoppingListArray = [];
let recipesArray = [];

let displayPage = "shopping list";
let activeRecipe = 0;

function saveToLocal() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingListArray));
  localStorage.setItem("recipes", JSON.stringify(recipesArray));
}

const storedShoppingList = localStorage.getItem("shoppingList");
if (storedShoppingList) {
  shoppingListArray = JSON.parse(storedShoppingList);
}

const storedRecipes = localStorage.getItem("recipes");
if (storedRecipes) {
  recipesArray = JSON.parse(storedRecipes);
}

displayPage = "recipe list";
recipePage.style.display = "none";
shoppingListPage.style.display = "none";
recipeListPage.style.display = "flex";

buildList();

// Shopping list page
shoppingListAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const listData = new FormData(shoppingListAdd);

  shoppingListArray.push(listData.get("shopping-list-input"));

  shoppingListInput.value = "";
  saveToLocal();
  displayPage = "shopping list";
  buildList();
});

// Recipe list page
recipeListAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const listData = new FormData(recipeListAdd);

  recipesArray.push({
    name: listData.get("recipe-list-input"),
  });

  saveToLocal();

  recipeListInput.value = "";
  displayPage = "recipe list";
  buildList();
});

// Recipe page - ingredients
ingredientAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const listData = new FormData(ingredientAdd);

  recipesArray[activeRecipe].ingredients.push(listData.get("ingredient-input"));
  saveToLocal();
  ingredientInput.value = "";
  displayPage = "recipe";
  buildList();
});

instructionsArea.addEventListener("submit", (e) => {
  e.preventDefault();
  const listData = new FormData(instructionsArea);
  if (!recipesArray[activeRecipe].instructions) {
    recipesArray[activeRecipe].instructions = [];
  }
  recipesArray[activeRecipe].instructions = listData.get("instructions-input");
});

// Clear list function
function removeList() {
  while (shoppingList.firstChild) {
    shoppingList.firstChild.remove();
  }
  while (recipeList.firstChild) {
    recipeList.firstChild.remove();
  }
  while (ingredientList.firstChild) {
    ingredientList.firstChild.remove();
  }
}

// Build list function
function buildList() {
  removeList();
  if (displayPage === "shopping list") {
    shoppingListArray.forEach((e, i) => {
      const item = document.createElement("input");
      item.value = e;
      item.addEventListener("click", () => {
        shoppingListArray.splice(i, 1);
        item.remove();
        saveToLocal();
        buildList(); //?
      });
      shoppingList.prepend(item);
    });
  } else if (displayPage === "recipe list") {
    recipesArray.forEach((e, i) => {
      const name = document.createElement("input");
      const addToShoppingListButton = document.createElement("button");
      const nameAndButtonContainer = document.createElement("div");

      name.value = e.name;
      addToShoppingListButton.classList.add("add-to-shopping-list-button");
      nameAndButtonContainer.classList.add("name-and-button-container");

      nameAndButtonContainer.append(name, addToShoppingListButton);
      recipeList.prepend(nameAndButtonContainer);

      name.addEventListener("click", () => {
        activeRecipe = i;
        recipeName.textContent = e.name;
        if (!recipesArray[activeRecipe].ingredients) {
          recipesArray[activeRecipe].ingredients = [];
        }

        removeList();
        displayPage = "recipe";

        shoppingListPage.style.display = "none";
        recipeListPage.style.display = "none";
        recipePage.style.display = "flex";
        // console.log(activeRecipe);
        buildList();
      });
      //   Transfer ingredients from recipesArray to shoppingListArray
      addToShoppingListButton.addEventListener("click", () => {
        recipesArray[i].ingredients.forEach((e) => {
          shoppingListArray.push(e);
          saveToLocal();
        });
      });
    });
  } else if (displayPage === "recipe") {
    // Loop over the active recipe's ingredient list
    recipesArray[activeRecipe].ingredients.forEach((e, i) => {
      const ingredient = document.createElement("input");
      ingredient.value = e;

      ingredient.addEventListener("click", () => {
        recipesArray[activeRecipe].ingredients.splice(i, 1);
        ingredient.remove();
        saveToLocal();
      });

      //   "●"
      ingredientList.append(ingredient);
    });

    if (!recipesArray[activeRecipe].instructions) {
      recipesArray[activeRecipe].instructions = null;
    }
    instructionsInput.value = recipesArray[activeRecipe].instructions;
  }
}

recipesButton.addEventListener("click", () => {
  removeList();
  displayPage = "recipe list";
  recipePage.style.display = "none";
  shoppingListPage.style.display = "none";
  recipeListPage.style.display = "flex";
  buildList();
});

shoppingListButton.addEventListener("click", () => {
  removeList();
  displayPage = "shopping list";
  recipeListPage.style.display = "none";
  recipePage.style.display = "none";
  shoppingListPage.style.display = "flex";
  buildList();
});

deleteButton.addEventListener("click", () => {
  console.log(activeRecipe);
  recipesArray.splice(activeRecipe, 1);
  removeList();
  saveToLocal();
  displayPage = "recipe list";
  recipePage.style.display = "none";
  shoppingListPage.style.display = "none";
  recipeListPage.style.display = "flex";

  buildList();
});

// Array checker buttons

/* consoleLogRecipeListArray.addEventListener("click", () => {
  console.log(recipesArray);
});
consoleLogShoppingListArray.addEventListener("click", () => {
  console.log(shoppingListArray);
});
 */
