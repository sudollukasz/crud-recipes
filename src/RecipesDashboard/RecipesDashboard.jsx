import React, { Component } from 'react';
import cuid from 'cuid';
import RecipesList from '../RecipesList/RecipesList';
import RecipesForm from '../RecipesForm/RecipesForm';
import './RecipesDashboard.scss';

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

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  updateRecipe = updatedRecipe => {
    const updatedRecipes = this.state.recipes.map(recipe => {
      if (recipe.id === updatedRecipe.id) {
        return Object.assign({}, updatedRecipe);
      } else {
        return recipe;
      }
    });

    this.setState({
      recipes: updatedRecipes,
      isOpen: false,
      selectedRecipe: null
    });

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  deleteRecipe = recipeId => {
    const updatedRecipes = this.state.recipes.filter(rec => rec.id !== recipeId);
    this.setState({
      recipes: updatedRecipes
    });

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  componentDidMount() {
    if (localStorage.hasOwnProperty('recipes')) {
      const recipes = localStorage.getItem('recipes');
      this.setState({
        recipes: JSON.parse(recipes)
      });
    }
  }

  render() {
    return (
      <div className="container">
        <RecipesList recipes={this.state.recipes} openRecipe={this.openRecipe} />
        {this.state.isOpen && (
          <RecipesForm
            closeForm={this.closeForm}
            createRecipe={this.createRecipe}
            updateRecipe={this.updateRecipe}
            deleteRecipe={this.deleteRecipe}
            selectedRecipe={this.state.selectedRecipe}
          />
        )}
        {!this.state.isOpen && (
          <button type="button" onClick={this.openForm} className="new-recipe__button">
            Create New
          </button>
        )}
      </div>
    );
  }
}

export default RecipesDashboard;
