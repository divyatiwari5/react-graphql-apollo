import { gql } from "@apollo/client";

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

export const GET_CHARACTER_DETAILS = (characterId: number) => gql`
    query {
        charactersByIds( ids: ${characterId}) {
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