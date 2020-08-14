import React from 'react'
import './App.css'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import withFirebase from './hoc/withfirebase'
import PropTypes from 'prop-types'
import ColorContext from './components/Color'

    const App = ({//props
      match,
      recettes,
      ajouterRecette,
      modifierRecette,
      supprimerRecette,
      chargerExemple,
      test }) => {
          const cards = Object.keys(recettes)
            .map(key => <Card key={key} details={recettes[key]}></Card>)

    return (
      <ColorContext>
          <div className='box'>
            <Header pseudo={match.params.pseudo} />
            <div className='cards'>
                {cards}
            </div>
            <Admin
            pseudo = {match.params.pseudo}
            recettes={recettes}
            ajouterRecette={ajouterRecette} 
            modifierRecette={modifierRecette}
            supprimerRecette={supprimerRecette}
            chargerExemple={chargerExemple}
            />
          </div>
      </ColorContext>
    )
  }
  App.propTypes = {
    match: PropTypes.object.isRequired,
    recettes: PropTypes.object.isRequired,
    ajouterRecette: PropTypes.func.isRequired,
    modifierRecette: PropTypes.func.isRequired,
    supprimerRecette: PropTypes.func.isRequired,
    chargerExemple: PropTypes.func.isRequired,
    test: PropTypes.func.isRequired
  }

const WrappedComponent = withFirebase(App)
export default WrappedComponent
