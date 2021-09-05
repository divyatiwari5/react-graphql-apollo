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

describe('Loading state', () => {
	test('can show loader', async () => {
		renderWithRouter(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CharacterDetail />
			</MockedProvider>,
			{route: "/profile/1-random-stuff", path: "/profile/:slug"}
		);
	
		const loadingContainer = await document.querySelector('#loading-details');
		expect(loadingContainer).toBeInTheDocument()
		expect(loadingContainer).toHaveTextContent("Loading Details...")
	});
})

describe('Given an invalid character id', () => {
	test('invalid id throws error', async () => {
		renderWithRouter(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CharacterDetail />
			</MockedProvider>,
			{route: "/profile/30-random-stuff", path: "/profile/:slug"}
		);
	await new Promise(resolve => setTimeout(resolve, 0));

	const errorContainer = await screen.getByTestId('not-found-section');
	expect(errorContainer).toBeInTheDocument()	
	})
}) 


describe('Given a valid character id', () => {
	test('can show character details', async () => {
		renderWithRouter(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CharacterDetail />
			</MockedProvider>,
			{route: "/profile/1-random-stuff", path: "/profile/:slug"}
		);
	
		await new Promise(resolve => setTimeout(resolve, 0));
		const container = await screen.getByTestId("CharacterCardContainer")
		expect(container).toBeInTheDocument()
		expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
		expect(screen.getByText('Alive')).toBeInTheDocument()
		expect(screen.getByText('Human')).toBeInTheDocument()
		expect(screen.getByText('Male')).toBeInTheDocument()
		expect(screen.getByText('Location')).toBeInTheDocument()
		expect(screen.getByText('Earth (Replacement Dimension)')).toBeInTheDocument()
	});

	test('can show color as per the status', async () => {
		renderWithRouter(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CharacterDetail />
			</MockedProvider>,
			{route: "/profile/1-random-stuff", path: "/profile/:slug"}
		);
	
		await new Promise(resolve => setTimeout(resolve, 0));
		const style = await screen.getByTestId("characterStatusColor");
		expect(style).toHaveStyle(`background: green`)
	})
	
})

