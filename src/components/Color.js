import React, { Component } from 'react';

const ColorContext = React.createContext()

class ColorProvide extends Component {
    state = {
        color: 'seagreen'
    }
    render() {
        return (
            <ColorContext.Provider
            value={{state: this.state}} >
            {this.props.children}
            </ColorContext.Provider>
        );
    }
}

export { ColorContext }
export default ColorProvide;