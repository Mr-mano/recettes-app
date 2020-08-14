import React from 'react';

const AdminForm = ({id: key, modifierRecette, recettes, supprimerRecette}) => {
    
const recette = recettes[key]

const handleChange = (event, key ) => {
    const { name, value } = event.target //récupérer le nom et les values de la recette
    const recette = recettes[key] //création d'une nouvelle recette avec la même key
    recette[name] = value // modification des valeurs du tableau name
    modifierRecette(key, recette) // enregistrer les nouvelles values (modifierRecette déclarer ds App.js)
}

    return (
        <div className="card">
            <form className="admin-form">
                <input value={recette.nom} onChange={e => handleChange(e, key)} type="text" name="nom" placeholder="Nom de la recette" />
                <input value={recette.image} onChange={e => handleChange(e, key)} type="text" name="image" placeholder="Adresse de l'image" />
                <textarea value={recette.ingredients} onChange={e => handleChange(e, key)} name="ingredients" placeholder="Liste des ingrédients" rows="3"/>
                <textarea value={recette.instructions} onChange={e => handleChange(e, key)} name="instructions" placeholder="Liste des instructions" rows="15"/>
            </form>
            <button onClick={() => supprimerRecette(key)}>Supprimer</button>           
        </div>
    );
};

export default AdminForm;