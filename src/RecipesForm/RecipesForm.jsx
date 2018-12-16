import React, { Component } from 'react';

export class RecipesForm extends Component {
  state = {
    recipe: {
      recipeName: '',
      ingridients: ''
    }
  };

  componentDidMount() {
    const { selectedRecipe } = this.props;
    if (selectedRecipe !== null) {
      this.setState({
        recipe: selectedRecipe
      });
    }
  }

  onInputChange = recipe => {
    const newRecipe = this.state.recipe;
    newRecipe[recipe.target.name] = recipe.target.value;
    this.setState({
      recipe: newRecipe
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.recipe.id) {
      this.props.updateRecipe(this.state.recipe);
    } else {
      this.props.createRecipe(this.state.recipe);
    }
  };

  render() {
    const { closeForm } = this.props;
    const { recipe } = this.state;
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Name:</label>
          <input
            name="recipeName"
            onChange={this.onInputChange}
            value={recipe.recipeName}
            placeholder="Recipe Name"
          />
          <label>Ingridients:</label>
          <input
            name="ingridients"
            onChange={this.onInputChange}
            value={recipe.ingridients}
            placeholder="Ingridients"
          />
          <button type="submit">Ok</button>
          <button onClick={closeForm}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default RecipesForm;
