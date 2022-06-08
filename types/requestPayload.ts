import { DocumentNode } from 'graphql';
import { API_KEY_HEADER } from 'libs/apollo';
// import { COUNTRY_CODE_HEADER, LANGUAGE_HEADER } from '@ocs/i18n-config';

export interface RequestPayload {
  query: DocumentNode;
  variables: { [key: string]: string | string[] };
  context: {
    headers: {
      [API_KEY_HEADER]: string | string[];
      // [COUNTRY_CODE_HEADER]: string | string[];
      // [LANGUAGE_HEADER]: string | string[];
      [key: string]: string | string[];
    };
  };
}
