import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { CharacterDetail } from './characterDetail';
import { HomePage } from './homePage';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/page/:pageRef">
					<HomePage/>
				</Route>
				<Route path="/profile/:slug">
					<CharacterDetail/>
				</Route>
				<Route path="/">
					<Redirect to="/page/1"/> 
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
