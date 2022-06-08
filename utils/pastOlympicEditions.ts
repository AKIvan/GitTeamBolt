import { RequestPayload } from 'types/requestPayload';
import { PAST_OLYMPIC_EDITIONS } from 'gql/queries/PastOlympicEditions';

export const getRequestPayload = (
  type: string
): RequestPayload => ({
  query: PAST_OLYMPIC_EDITIONS,
  variables: { type },
  context: {
    headers: {
      'x-api-key': 'LsYhfPd60R7QZLuC8cIAv5W5tL7oqxX6kQpkil8f',
      'x-country-code': 'US',
      'x-language': 'en',
    },
  },
});
