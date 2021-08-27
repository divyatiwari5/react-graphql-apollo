import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					Home Page
				</Route>
				<Route path="/page/:pageNumber" exact>
					Page X
				</Route>
				<Route path="/profile/:characterId" exact>
					Profile Page
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
