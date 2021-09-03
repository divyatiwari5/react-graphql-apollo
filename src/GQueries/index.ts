import { gql } from "@apollo/client";

/**
 * List all characters that satisfy the criteria with pagination
 * @param page : page number, default value is 1
 * @param searchString default is empty string 
 * @returns 
 */
export const GET_CHARACTERS = (page = 1, searchString = "") => gql`
  query {
      characters(page: ${page}, filter: { name: "${searchString}" }) {
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
`

/**
 * Get details of a character
 * @param characterId: ID of character
 * @returns 
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
`