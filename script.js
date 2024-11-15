/*
Separate arrays
1 for shopping list
1 for recipe list

const/let recipes = [
{name: "spaghetti supreme",
description: "First start with...",
ingredient1: "spaghetti",
ingredient2: "tomatoes",
ingredient3: "olive oil"},]


*/

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
const recipeListPage = document.querySelector("#recipes-list-page");
const recipeListAdd = document.querySelector("#recipe-list-add");
const recipeListInput = document.querySelector("#recipe-list-input");
const recipeList = document.querySelector("#recipe-list");

// Recipes page
const recipePage = document.querySelector("#recipe-page");
const recipeName = document.querySelector("#recipe-name");
const ingredientAdd = document.querySelector("#ingredient-add");
const ingredientInput = document.querySelector("#ingredient-input");
const ingredientList = document.querySelector("#ingredient-list");

let recipesArray = [];
let shoppingListArray = [];

let displayPage = "shopping list";
let activeRecipe = 0;

// shoppingListPage.style.display = "none";

// Shopping list page
shoppingListAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const listData = new FormData(shoppingListAdd);

  shoppingListArray.push({
    item: listData.get("shopping-list-input"),
  });

  shoppingListInput.value = "";
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

  recipeListInput.value = "";
  displayPage = "recipe list";
  buildList();
});

// Recipe page - ingredients
ingredientAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(activeRecipe);
  const listData = new FormData(ingredientAdd);
  if (!recipesArray[activeRecipe].ingredients) {
    recipesArray[activeRecipe].ingredients = [];
  }
  recipesArray[activeRecipe].ingredients.push("pasta");
  console.log(recipesArray);
  displayPage = "recipe";
  buildList();
  //   console.log(displayPage);
});

// Clear list function
const removeList = () => {
  while (shoppingList.firstChild) {
    shoppingList.firstChild.remove();
  }
  while (recipeList.firstChild) {
    recipeList.firstChild.remove();
  }
};

const buildList = () => {
  removeList();
  if (displayPage === "shopping list") {
    shoppingListArray.forEach((e, i) => {
      const item = document.createElement("input");
      item.value = e.item;
      shoppingList.prepend(item);
    });
  } else if (displayPage === "recipe list") {
    recipesArray.forEach((e, i) => {
      const name = document.createElement("input");

      name.value = e.name;
      recipeList.prepend(name);

      name.addEventListener("click", () => {
        console.log(`go to ${e.name} recipe`);
        activeRecipe = i;
        // displayPage = "recipe";
        // console.log(activeRecipe);
        console.log(displayPage);
      });
    });
  } else if (displayPage === "recipe") {
    recipesArray.forEach((e, i) => {
      const ingredient = document.createElement("input");
      //   ingredient.value = e.ingredients;
      ingredient.value = e.ingredients...
      ingredientList.prepend(ingredient);
      console.log(e);
    });
  }
};

recipesButton.addEventListener("click", () => {
  removeList();
  recipeListAdd.style.display = "flex";
});

shoppingListButton.addEventListener("click", () => {
  recipeListAdd.style.display = "flex";
  buildList();
});
