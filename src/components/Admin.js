import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'
import Login from './Login'

class Admin extends Component {
    state ={
        uid: null, //id visiteur
        admin: null 
    }

    //garder l'utilisateur connecté
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if (user) {
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, { context: this })

        if (!box.admin) {
          await base.post(`${this.props.pseudo}/admin`, {
            data: authData.user.uid
          })
        }
        //mise à jour du state
        this.setState({
            uid: authData.user.uid, // uid est bien égale à l'id utilisateur de la database
            admin: box.admin || authData.user.uid // l'utilisateur est déjà admin || ou il vient de créer sa page
        })
    }
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth() // connection
            .signInWithPopup(authProvider) // popup facebook
            .then(this.handleAuth) //ensuite appel handeAuth
    }

    logout = async () => {
        console.log('déconnexion')
        await firebase.auth().signOut() // déconnexion
        this.setState({ uid: null}) // mise à jour du state
    }


    render() {
        const { recettes, ajouterRecette, modifierRecette, chargerExemple, supprimerRecette}
        = this.props

        // si l'utilisateur n'est pas connecté
        if (!this.state.uid){
            return <Login authenticate={this.authenticate}></Login>
        }
        if (this.state.uid !== this.state.admin) {
            return(
                <div>
                    <p>Tu n'es pas l'administrateur de cette page !</p>
                    
                </div>
            )
        }

        const logout = <button onClick={this.logout}>Déconnexion</button>

        return (
            <div className="cards">
                <AjouterRecette ajouterRecette={ajouterRecette} />
                {
                    Object.keys(recettes)
                    .map(key => 
                    <AdminForm
                    key={key}
                    id={key}
                    modifierRecette={modifierRecette}
                    supprimerRecette={supprimerRecette}
                    recettes={recettes}
                    />)
                }
                <footer>
                    {logout}
                    <button onClick={chargerExemple}>Remlir</button>
                </footer>
            </div> 
        );
    }
}

export default Admin;