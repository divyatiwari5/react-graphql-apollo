import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SingleCharacter from './Pages/HomePage/CharacterCard/SingleCharacter';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/page/:pageNumber">
					<HomePage/>
				</Route>
				<Route path="/profile/:slug">
					<SingleCharacter/>
				</Route>
				<Route path="/">
					<Redirect to="/page/1"/> 
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
