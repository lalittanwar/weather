// import React,{ useReducer } from 'react'

// const initialState = false;
// const context = React.createContext( initialState );

// const { Provider,Consumer } = context;


// const reducer = ( state,action ) => {
//     switch ( action ) {
//         case 'dark':
//             const newState = true;
//             return newState;
//         case 'light':
//             newState = false;
//             return newState;
//         default:
//             return state;
//     }
// }

// const stateProvider = () => {
//     const [ state,dispatch ] = useReducer( reducer,initialState );
//     return <Provider value={ { state,dispatch } }></Provider>
// }

// export { Provider,Consumer,context,stateProvider }
