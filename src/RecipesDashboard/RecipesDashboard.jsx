import React, { Component } from 'react';
import cuid from 'cuid';
import RecipesList from '../RecipesList/RecipesList';
import RecipesForm from '../RecipesForm/RecipesForm';

class RecipesDashboard extends Component {
  state = {
    recipes: [],
    isOpen: false,
    selectedRecipe: null
  };

  openForm = () => {
    this.setState({
      isOpen: true,
      selectedRecipe: null
    });
  };
  closeForm = () => {
    this.setState({
      isOpen: false
    });
  };

  openRecipe = recipeToOpen => {
    this.setState({
      selectedRecipe: recipeToOpen,
      isOpen: true
    });
  };

  createRecipe = newRecipe => {
    newRecipe.id = cuid();
    const updatedRecipes = [...this.state.recipes, newRecipe];
    this.setState({
      recipes: updatedRecipes,
      isOpen: false
    });
  };

  updateRecipe = updatedRecipe => {
    this.setState({
      recipes: this.state.recipes.map(recipe => {
        if (recipe.id === updatedRecipe.id) {
          return Object.assign({}, updatedRecipe);
        } else {
          return recipe;
        }
      }),
      isOpen: false,
      selectedRecipe: null
    });
  };

  render() {
    return (
      <div>
        <RecipesList recipes={this.state.recipes} openRecipe={this.openRecipe} />
        <button type="button" onClick={this.openForm}>
          Create New
        </button>
        {this.state.isOpen && (
          <RecipesForm
            closeForm={this.closeForm}
            createRecipe={this.createRecipe}
            updateRecipe={this.updateRecipe}
            selectedRecipe={this.state.selectedRecipe}
          />
        )}
      </div>
    );
  }
}

export default RecipesDashboard;
