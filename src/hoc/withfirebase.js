import React, { Component } from 'react';
// firebase
import base from '../base'
import recettes from '../recettes'

const withfirebase = WrappedComponent =>(
    class HOC extends Component {

        state = {
            pseudo: this.props.match.params.pseudo,
            recettes: {},
          }

        componentDidMount () {
            this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
            context: this,
            state: 'recettes'
            })
            this.setState({ update: true })
        }
        
        componentWillUnmount () {
            base.removeBinding(this.ref)
        }
        
          //ajouter une recettes
        ajouterRecette = recette => {
            //déclarer l'objet recette
            const recettes = { ...this.state.recettes }
            //déclarer la nouvelle recette avec une key unique Date.now()
            recettes[`recette-${Date.now()}`] = recette
            //valider la nouvelle recette
            this.setState({ recettes })
        }
        
        modifierRecette = (key, newRecette) => { 
            const recettes = { ...this.state.recettes }
            recettes[key] = newRecette
            this.setState({ recettes })
        }
        
        supprimerRecette = key => { 
            const recettes = { ...this.state.recettes } // récupére la recette
            recettes[key] = null // on passe à null pour supprimer
            this.setState({ recettes }) //mets à jours la recette
        }
        
        
        chargerExemple = () => this.setState({recettes})

        render() {
            return (
                <WrappedComponent
                    recettes={this.state.recettes}
                    ajouterRecette={this.ajouterRecette} 
                    modifierRecette={this.modifierRecette}
                    supprimerRecette={this.supprimerRecette}
                    chargerExemple={this.chargerExemple}
                    {...this.props} />
            );
        }
    }
)
export default withfirebase;