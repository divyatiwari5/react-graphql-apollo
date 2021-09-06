import { gql } from '@apollo/client';

/**
 * List all characters that satisfy the criteria with pagination
 */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $searchString: String!){
      characters(page: $page, filter: { name: $searchString }) {
    info {
      count,
      pages,
      next,
      prev
    }
    results {
        name
        id
        image
        status
      }
  }
}
`;

/***
 * Get details of a character
 */
export const GET_CHARACTER_DETAILS = gql`
    query GetCharacterById($characterId: ID!) {
      character(id: $characterId) {
		  name,
		  id,
		  status,
		  species,
		  image,
		  type,
		  gender,
          location {
            name
          }
        }
    }
`;

/***
 * Get list of characters by ids
 */
export const GET_CHARACTERS_BY_IDS = gql`
    query GetCharacterByIds($characterIds: [ID!]!) {
      charactersByIds(ids: $characterIds) {
		  name,
		  id,
		  status,
		  image,
        }
    }
`;
