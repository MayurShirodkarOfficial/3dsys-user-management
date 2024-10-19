import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import DashBoard from './components/DashBoard';

const App = () => {

    return (
        <Provider store={store}>
           <DashBoard/>
        </Provider>
    );
};

export default App;
