import React from 'react'
import { Route } from 'react-router-dom'


// import pages
import Home from './pages/home'



class App extends React.Component {


    render() {
        return (
            <div>
                <Route path='/' component={Home} exact />
            </div>
        )
    }
}



export default (App)