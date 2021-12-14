## 🎯 Goal

Create a web app that lists Rick and Morty characters based on this API: https://rickandmortyapi.com/documentation/#graphql. 

Use SEO-friendly page slugs. E.g. `/profile/24-rick-sanchez`

### Homepage

Includes:

1. List 20 characters per page
2. Have pagination. Limit the number of shown pages in the pagination. E.g. `1, 2, 3, ..., 30, 31, 32`
3. Each character should have a card

### Card

Includes this information about a character:

1. image
2. name
3. status - a badge next to the name that its colour corresponds to:
    - green when status=Alive
    - red when status=Dead
    - grey when status=unknown
4. a link to the character's profile

### Profile

Is accessible on this route: `/profile/%character_id` and include this information in addition to the card:

1. species
2. type
3. gender
4. location name
5. backlink to the homepage

### Search

A search box is present on all pages.
Added auto-complete functionality to the search box.

After the user submits the search query, user gets redirected to this route: `/search?q=%s`

### Recently Visited Profiles

Showed a list of the **last 10 visited profiles** in the footer of all pages.
