import React, { Component } from 'react';
import './RecipeList.scss';

export class RecipesList extends Component {
  render() {
    const { recipes, openRecipe } = this.props;
    return (
      <div>
        <h1 className="list__title">Recipes List</h1>
        {recipes.map(recipe => (
          <li key={recipe.id} className="list__element">
            <button
              className="list__element__button"
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
