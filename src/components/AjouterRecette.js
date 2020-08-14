import React, { Component } from 'react';

class AjouterRecette extends Component {
state = {
    nom: '',
    image: '',
    ingredients: '',
    instructions: ''
}

    handleChange = event => {
        //function avec 2 arguments récupérés dans event.target(le champ)
        const { name, value } = event.target
        this.setState({ [name]: value})
    }

    handleSubmit = event => {
        event.preventDefault() //annule l'event' par default
        const recette = { ...this.state} //copier le state
        this.props.ajouterRecette(recette)//appeler la function AjouterRecette
        //vide le formulaire après validation -> boucler et mettre à 0
        Object.keys(recette).forEach(item => {
            recette[item]= ''
        })
        this.setState({ ...recette }) // je renvoie la recette vide, donc form vide
    }

    render() {
        return (
            <div className="card">
                <form className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                    <input value={this.state.nom} onChange={this.handleChange} name="nom" type="text" placeholder="Nom de la recette"/>
                    <input value={this.state.image} onChange={this.handleChange} name="image" type="text" placeholder={'Nom de l\'image'}/>
                    <textarea value={this.state.ingredients} onChange={this.handleChange} name="ingredients"  rows="3" placeholder="Liste des ingredients"></textarea>
                    <textarea value={this.state.instructions} onChange={this.handleChange} name="instructions"  rows="15" placeholder="Liste des instructions"></textarea>
                    <button type="submit">Valider la recette</button>
                </form>
            </div>
        );
    }
}
export default AjouterRecette;