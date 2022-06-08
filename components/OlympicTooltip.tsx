import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const OlympicTooltip = ({ data }: any) => {
  console.log(data);
  return <h1>{data?.name}</h1>;
};

const OlympicTooltipWrapper = () => {
  useEffect(() => {
    console.log('hover change');
    const interval = setInterval(() => {
      const tooltip = document.getElementById('tooltip');
      const data = tooltip?.getAttribute('data');
      if (tooltip) {
        createRoot(tooltip).render(
          <OlympicTooltip data={JSON.parse(data as string)} />
        );
      }
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <></>;
};

export default OlympicTooltipWrapper;
