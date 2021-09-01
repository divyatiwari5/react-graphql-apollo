import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SingleCharacter from './Pages/HomePage/CharacterCard/SingleCharacter';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<HomePage/>
				</Route>
				<Route path="/search">
					<HomePage/>
				</Route>
				<Route path="/page/:pageNumber" exact>
					Page X
				</Route>
				<Route path="/profile/:characterId" exact>
					<SingleCharacter/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
