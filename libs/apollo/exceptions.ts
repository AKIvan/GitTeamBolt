import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { ApolloError } from '@apollo/client/errors/ApolloError';
// import { Props as ExceptionProps } from 'pages/404';
// import AppError from 'utils/isr/errors';

export type ExceptionResult = {
  notFound?: boolean;
  props: any;
  revalidate?: number;
};

export const checkIfErrorIsPresent = (errors: string[]): boolean => {
  // strings we want to ensure are present in the error messages to return a 404
  const possibleApolloErrors = ['cannot find', 'not found', "doesn't exist"];

  return errors.some((error) =>
    possibleApolloErrors.some((possibleError) =>
      error.toLowerCase().includes(possibleError.toLowerCase())
    )
  );
};

export const catchApolloClientException = async (
  ex: ApolloError,
  isr = false
): Promise<ExceptionResult> => {
  let statusCode = 500;
  let graphqlErrors: Array<string> = [];
  const networkErrors: Array<string> = [];
  if (ex.graphQLErrors) {
    graphqlErrors = ex.graphQLErrors.map(
      (error) => `GraphQL Error > ${error.path?.join('>')} - ${error.message}`
    );

    if (
      ex.graphQLErrors[0]?.extensions?.code === 'NOT_FOUND_ERROR' ||
      // ex.graphQLErrors[0]?.extensions?.exception?.code === 'MODULE_NOT_FOUND' ||
      checkIfErrorIsPresent(graphqlErrors)
    ) {
      statusCode = 404;
    }
  }

  if (ex.networkError) {
    networkErrors.push(`Network Error > ${ex.networkError.message}`);
    // https://github.com/apollographql/apollo-link/issues/300#issuecomment-518445337
    statusCode =
      'statusCode' in ex.networkError ? ex.networkError.statusCode : statusCode;
  }

  if (statusCode === 500 && ex.toString().indexOf('not found') >= 0) {
    statusCode = 404;
    graphqlErrors.push(ex.toString());
  }

  const errors = [...graphqlErrors, ...networkErrors];

  const errorProps = {
    props: {
      statusCode,
      errors,
    },
  };

  if (statusCode === 404) {
    Object.assign(errorProps, { notFound: true });
  }

  // For ISR:
  // We don't want to generate error pages on build time unless is a 404
  // for 5xx errors we will throw an Error forcing NEXT to serve the stale version, this allows immediate regeneration.
  if (isr && statusCode !== 404) {
    // const { NEXT_PHASE } = process.env;
    // if (!NEXT_PHASE || NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    //   // This AppError will redirect the rendering flow to _error.tsx and it's getInitialProps method.
    //   throw new AppError(statusCode, errors);
    // } else {
      // But if this happens on build time, build will fail so we return an Error page with small revalidate time.
      // We will show a 500 error page but will revalidate every second when visiting to check if data is back and regenerate the page.
      return {
        ...errorProps,
        revalidate: 1,
      };
    }
  // }

  return errorProps;
};
