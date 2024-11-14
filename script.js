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

const recipesButton = document.querySelector("#recipies-button");
const shoppingListButton = document.querySelector("shopping-list-button");
const list = document.querySelector("#list");
const listAdd = document.querySelector("#list-add");
const userInput = document.querySelector("#user-input");

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

  //   console.log(recipes);
  buildList();
});

const buildList = () => {
  while (list.firstChild) {
    list.firstChild.remove();
  }
  recipes.forEach((e, i) => {
    const name = document.createElement("input");
    // name.classList.add("listElements");
    name.value = e.name;
    // console.log(e.name);
    // console.log(name.value);
    list.prepend(name);
    // console.log(recipes);
  });
};
