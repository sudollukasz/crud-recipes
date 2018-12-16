import React, { Component } from 'react';

export class RecipesList extends Component {
  render() {
    const { recipes, openRecipe } = this.props;
    return (
      <div>
        <h1>Recipes List</h1>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <button
              onClick={() => {
                openRecipe(recipe);
              }}
            >
              {recipe.recipeName}
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default RecipesList;
