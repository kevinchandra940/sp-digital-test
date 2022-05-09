import { combineReducers } from 'redux'

// import reducers
import { productReducer } from './productReducer'

// combine all reducers
const Reducers = combineReducers({
    product : productReducer
})

// export
export default Reducers

// const reducer = {
//     user : {
//         id,
//         user,
//         ....
//     },
//     carousel : null
// }