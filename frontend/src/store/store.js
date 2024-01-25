import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './Spots/spotsReducers';
import bookingsReducer from './Bookings/bookingsReducer';
import reviewsReducer from './Reviews/ReviewReducer';

// ROOT REDUCER
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  bookings: bookingsReducer,
  reviews: reviewsReducer
,});

// ENHANCER
let enhancer;

if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// STORE CREATION
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;