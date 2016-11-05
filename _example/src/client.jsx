import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';

import Alien from './aliens';

const et = new Alien('et');
const noise = et.makeNoise();

const App = props => (
  <div>
    The alien says: {props.message}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDom.render(<App message={noise} />, document.querySelector('.app'));
