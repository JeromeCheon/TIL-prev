import React from 'react';
import { Link } from 'react-router-dom';
interface Props {}
const Nav = ({}: Props) => (
	<nav>
		<h3>This is Logo</h3>
		<ul>
			<Link to='/'>
				<li>Main</li>
			</Link>
			<Link to='/about'>
				<li>About</li>
			</Link>
			<Link to='/info'>
				<li>Info</li>
			</Link>
		</ul>
	</nav>
);

export default Nav;
