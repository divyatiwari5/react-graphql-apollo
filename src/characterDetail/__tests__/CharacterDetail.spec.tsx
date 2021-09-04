import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTER_DETAILS } from '../../queries';
import { CharacterDetail } from '../components/CharacterDetail';
import { MemoryRouter, Route } from 'react-router-dom';
import { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (
	component: ReactElement,
	{
		route= "/",
		path= "/",
		history = createMemoryHistory({ initialEntries: [route] })
	} = {}
) => {
	return {
		...render(
			<MemoryRouter initialEntries={[route]}>
				<Route path={path}>{component}</Route>
			</MemoryRouter>
		),
		history
	};
};

const mocks = [
	{
		request: {
			query: GET_CHARACTER_DETAILS,
			variables: {characterId: 1}
		},
		result: {
			data: {
				character: {
					name: "Rick Sanchez",
					id: 1,
					status: "Alive",
					species: "Human",
					image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
					type: "",
					gender: "Male",
					location: {
						name: "Earth (Replacement Dimension)"
					}
				}
			}
		}
	},
	{
		request: {
			query: GET_CHARACTER_DETAILS,
			variables: {characterId: NaN}
		},
		result: {
			error: new Error("Some error occurred.")
		}
	}
];

test('renders without error', async () => {
	renderWithRouter(
		<MockedProvider mocks={mocks} addTypename={false}>
			<CharacterDetail />
		</MockedProvider>,
		{route: "/profile/1-random-stuff", path: "/profile/:slug"}
	);

	await new Promise(resolve => setTimeout(resolve, 0));
	const container = await screen.findByTestId("CharacterCardContainer")
	console.log(container);
});
