import gql from 'graphql-tag';

export const PAST_OLYMPIC_EDITIONS = gql`
  query PastOlympicEditions($type: OlympicGameTypeFilter!) {
    allOlympicGames(type: $type) {
      meta {
        slug
        url
      }
      location
      year
      name
      season
    }
  }
`;