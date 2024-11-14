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

const recipesButton = document.querySelector("#recipes-button");
const shoppingListButton = document.querySelector("#shopping-list-button");
const main = document.querySelector("#main");
const list = document.querySelector("#list");
const listAdd = document.querySelector("#list-add");
const userInput = document.querySelector("#user-input");
let displayPage = "recipe list";

let recipes = [];
let shoppingList = [];

listAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const listData = new FormData(listAdd);

  recipes.push({
    name: listData.get("user-input"),
  });
  //   Clear input field after submitting
  userInput.value = "";

  buildList();
});

// Clear list function
const removeList = () => {
  while (list.firstChild) {
    list.firstChild.remove();
  }
};

const buildList = () => {
  removeList();
  recipes.forEach((e, i) => {
    const name = document.createElement("input");

    if (displayPage === "recipe list") {
      name.value = e.name;
      list.prepend(name);
    } else if (displayPage === "recipe") {
      name.value = e.ingredient;
      ingredients.append(ingredient);
    }

    name.addEventListener("click", () => {
      console.log(`go to ${e.name} recipe`);
      //   Some function or value
      recipePage(e);
    });
  });
};

recipesButton.addEventListener("click", () => {
  removeList();
  listAdd.style.display = "flex";
});

shoppingListButton.addEventListener("click", () => {
  listAdd.style.display = "flex";
  buildList();
});

const recipePage = (e) => {
  const recipeArea = document.createElement("div");
  const recipeName = document.createElement("h2");
  const ingredients = document.createElement("div");
  const ingredientsList = document.createElement("form");
  const ingredientInput = document.createElement("input");
  const addIngredientsButton = document.createElement("input");
  const instructions = document.createElement("div");

  recipeArea.id = "recipe-area";
  ingredients.id = "ingredients";

  ingredientsList.id = "ingredients-list";

  ingredientInput.type = "text";
  ingredientInput.name = "ingredient-input";
  ingredientInput.id = "ingredient-input";

  addIngredientsButton.type = "submit";
  addIngredientsButton.value = "+";
  addIngredientsButton.id = "add-ingredients-button";

  removeList();
  listAdd.style.display = "none";

  recipeName.textContent = e.name;

  console.log("abc");
  //   Form event listener
  ingredientsList.addEventListener("submit", (e) => {
    e.preventDefault();
    const listData = new FormData(ingredientsList);

    recipes.push({
      ingredient: listData.get("ingredient-input"),
    });
    //   Clear input field after submitting
    ingredientInput.value = "";
    displayPage = "recipe";
    console.log(recipes);
    buildList();
  });

  addIngredientsButton.addEventListener("click", () => {});

  ingredients.append("Ingredients", ingredientInput, addIngredientsButton);
  recipeArea.append(recipeName, ingredients, instructions);
  main.append(recipeArea);
};
