import * as React from 'react';
import * as ReactDOM from 'react-dom';
import About from './About';
import Info from './Info';
import Nav from './Nav';

interface Props {}

const App = ({}: Props) => {
	return (
		<>
			<Nav />
			<About />
			<Info />
		</>
	);
};
ReactDOM.render(<App />, document.getElementById('app'));
