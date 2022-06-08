import OlympicTooltipWrapper from 'components/OlympicTooltip';
import { PastOlympicEditions } from 'gql/queries/__generated__/PastOlympicEditions';
import { initializeApollo } from 'libs/apollo';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { Chart } from 'react-google-charts';
import Select from 'react-select';
import styled from 'styled-components';
import { getRequestPayload } from 'utils/pastOlympicEditions';

const initialData = {
  eventName: 'Men 100 meters final',
  results: [
    { time: 810.55, name: 'athleteName', country: 'Spain', year: '2000' },
    { time: 910.55, name: 'athleteName1', country: 'France', year: '2004' },
    { time: 710.55, name: 'athleteName2', country: 'Spain', year: '2008' },
    { time: 610.55, name: 'athleteName3', country: 'France', year: '2012' },
    { time: 510.55, name: 'athleteName4', country: 'Spain', year: '2016' },
    { time: 410.55, name: 'athleteName5', country: 'France', year: '2020' },
  ],
};

const selectOptions = [
  { value: 'men-100', label: "Men's 100m" },
  { value: 'men-200', label: "Men's 200m" },
  { value: 'men-400', label: "Men's 400m" },
  { value: 'men-800', label: "Men's 800m" },
  { value: 'men-100', label: "Men's 1,500m" },
  { value: 'men-100', label: "Men's 5,000m" },
  { value: 'men-100', label: "Men's 10,000m" },
  { value: 'men-100', label: "Men's 50km Walk" },
  { value: 'men-100', label: "Men's 50km Walk" },
  { value: 'men-100', label: "Men's 110m Hurdles" },
  { value: 'men-100', label: "Men's 400m Hurdles" },
  { value: 'men-100', label: "Men's 3,000m Steeplechase" },
  { value: 'men-100', label: "Men's Marathon" },
];
const parsedData = initialData.results.map((data) => [
  data.year,
  data.time,
  `<div id="tooltip" data=${JSON.stringify(data)} ></div>`,
]);
const data = [
  ['Years', 'Time', { role: 'tooltip', type: 'string', p: { html: true } }],
  ...parsedData,
];

export const options = {
  chart: {
    title: 'Box Office Earnings in First Two Weeks of Opening',
    subtitle: 'in millions of dollars (USD)',
  },
  // This must be also set to render the tooltip with html (vs svg)
  tooltip: { isHtml: true, trigger: 'visible' },
};

const Home: NextPage = (props: Props) => {
  return (
    <Wrapper>
      <Head>
        <title>Team Bolt Statistics</title>
        <meta
          name='description'
          content='Come for the athlete statistics stay for the pizza'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>{initialData.eventName}</h1>
        <SelectWrapper>
          <Select options={selectOptions} />
        </SelectWrapper>
        <Chart
          chartType='LineChart'
          width='100%'
          height='400px'
          data={data}
          options={options}
        />
        <OlympicTooltipWrapper />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section``;
const SelectWrapper = styled.section`
  margin-bottom: 25px;
`;
/* SSR-START */
export const getServerSideProps = async (
  context: NextPageContext
): Promise<{ props: Props | Record<string, unknown> }> => {
  return (await getProps()) as { props: Props };
};
/* SSR-END */

const getProps = async () => {
  const requestPayload = getRequestPayload('NO_YOG');

  try {
    const apolloClient = initializeApollo();
    const result = await apolloClient.query<PastOlympicEditions>(
      requestPayload
    );

    const summerGames = result.data?.allOlympicGames?.filter(
      (olympicGame) => olympicGame.season === 'Summer'
    );

    return {
      props: { summerGames },
    };
  } catch (err: any) {
    console.error(err);
    return { props: { error: err.message } };
  }
};

export type Props = any;

export default Home;
