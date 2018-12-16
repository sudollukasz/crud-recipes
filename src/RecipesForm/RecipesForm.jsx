import React, { Component } from 'react';

export class RecipesForm extends Component {
  state = {
    recipe: {
      recipeName: '',
      ingridients: ''
    },
    disableEdit: false
  };

  componentDidMount() {
    const { selectedRecipe } = this.props;
    if (selectedRecipe !== null) {
      this.setState({
        recipe: selectedRecipe,
        disableEdit: true
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

  editForm = e => {
    e.preventDefault();
    this.setState({
      disableEdit: false
    });
  };

  render() {
    const { closeForm, deleteRecipe } = this.props;
    const { recipe, disableEdit } = this.state;

    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Name:</label>
          <input
            name="recipeName"
            onChange={this.onInputChange}
            value={recipe.recipeName}
            placeholder="Recipe Name"
            disabled={disableEdit}
          />
          <label>Ingridients:</label>
          <input
            name="ingridients"
            onChange={this.onInputChange}
            value={recipe.ingridients}
            placeholder="Ingridients"
            disabled={disableEdit}
          />
          {!disableEdit && <button type="submit">Ok</button>}

          {recipe.id && disableEdit && <button onClick={this.editForm}>Edit</button>}
          <button onClick={closeForm}>Cancel</button>
          {recipe.id && (
            <button
              onClick={() => {
                deleteRecipe(recipe.id);
              }}
            >
              Delete
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default RecipesForm;
