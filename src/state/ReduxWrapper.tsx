import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';

const createStore = () => reduxCreateStore(rootReducer);

interface Props {
  element: React.ReactNode;
}

export default ({ element }: Props) => <Provider store={createStore()}>{element}</Provider>
