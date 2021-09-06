## App structure and Features

### Features and Future Scope
- [x] List 20 characters at a time with Pagination
- [x] Available information of a character: name, image and status
- [x] Status code badge color as per the status
- [x] Link to the character's profile
- [x] Profile contains following info: species, location name, type, gender and backlink to the homepage
- [x] Search box on all the pages
- [x] Link to home page on all the pages
- [x] Home page contains link to visit 10 recently visited profiles
- [x] Limit number of shown pages in pagination. Eg. `1,2,3,...34,35`
- [x] Different page title for each page
- [x] Used SEO-friendly page slugs Eg. `/profile/1-rick-sanchez`
- [x] Submitted search form when user presses `Enter` key
- [x] Write test cases for character Detail page
- [x] Autocomplete search
- [ ] 100% test coverage
- [ ] Handle bug in slug url. Eg. `/profile/1-random-data` This will find data for character id `1`, irrespective of the name written after it
- [ ] Improvise UI/UX

### App Structure

- `src`: Contains all source code
   - `commons`: contains common components
     - `index.ts`: export all the common components at root level
     - `components`: contains common components
       - `Header.tsx`: contains link to the home page and search bar
       - `NotFound.tsx`: contains Not found page
       - `Search.tsx`: contains search bar
   - `homePage`: contains home page and character card to show list of characters
   - `characterDetail`: contains character Details
     - `__test__`: contains test cases for character detail component
   - `queries`:
     - `index.ts`: contains graphql queries - `GET_CHARACTERS`, `GET_CHARACTER_DETAILS` and `GET_CHARACTERS_BY_IDS`
     - `reactive.ts`: Defined reactive variables
   - `Styles`: contains css of the application
     - `_variables.scss`: define all the variables used in the application
     - `styles.scss`: defined scss. Can import css of components as well.
   - `App.tsx`: Handled routing
   - `index.tsx`: Initialize apollo client and connect it with the app
   - `package.json`: contains list of packages used in the application

## Tests with `jest`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Existing test scenarios

Character Detail page test scenarios:
- Loader is shown before loading data
- Passing Invalid character id shows error page
- Passing valid character id shows character detail page with the correct info
- Passing valid character id shows status badge color as per the status

### Run test cases

In the project directory

`npm test src/characterDetail/__tests__/CharacterDetail.spec.tsx `

## Running React App

In the project directory, you can run

### `npm install` or `yarn install`
It will install all the required packages

### `npm start` or `yarn start`
Runs the app in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Getting Started with the App`

On the main page, user can view the list of 20 characters of first page along with search bar and link to Home Page.

At the bottom, user can see the `pagination` and navigate to next and previous pages. 

At the end, user will also find a link to visit `10 recently visited profiles`

- [http://localhost:3000/page/1](http://localhost:3000/page/1): Contains a list of characters
- [http://localhost:3000/page/1/search?q=rick](http://localhost:3000/page/1/search?q=rick): Contains search result for `rick`
- [http://localhost:3000/profile/1-rick-sanchez](http://localhost:3000/profile/1-rick-sanchez): Contains profile page of `Rick Sanchez`
- [http://localhost:3000/page/recent](http://localhost:3000/page/recent): Contains list of 10 recently visited profiles