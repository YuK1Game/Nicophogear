
import React, { Fragment } from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './configs/combine';

class App extends React.Component {

    render() {    
        return (
            <Root />
        )
     }
}
 
render(<App />, document.getElementById('root'));
