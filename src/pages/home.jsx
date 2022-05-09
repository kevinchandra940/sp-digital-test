import React from 'react'

// import component
import Products from '../components/products'

class Home extends React.Component {
    render () {
        // console.log(this.props.location)
        return (
            <div>
                <Products/>
            </div>
        )
    }
}

export default Home