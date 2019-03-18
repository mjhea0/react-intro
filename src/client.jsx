import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Cat from './cats';

const catMeow = new Cat('Browser Cat').meow();

const App = (props) => {
  const { message } = props;
  return (
    <div>
      The cat says:&nbsp;
      { message }
    </div>
  );
};

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={catMeow} />, document.querySelector('.app'));
