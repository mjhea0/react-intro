import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Cat from './cats';

const catMeow = new Cat('Browser Cat').meow();

const App = props => (
  <div>
    The cat says: {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={catMeow} />, document.querySelector('.app'));
