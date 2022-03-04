import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import {Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = useGlobalContext();
  
  let data = repos.reduce((total,{language, stargazers_count:stars}) => {
    if (!language) return total;
    if (!total[language]) {
      total[language] = {
        label:language,
        value:1,
        stars
      }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stars
      }
    }
    return total;
  },{});
  data = Object.values(data);
  let languages = data.map(({label,value}) => {
    return {label, value}
  }).sort((a, b) => b.value - a.value).slice(0,5);

  let stars = data.map(({label, stars}) => {
    return {label, value:stars}
  }).sort((a, b) => b.value - a.value).slice(0,5);

  let mostPopular = repos.map(({name,stargazers_count}) => {
    return {label: name, value: stargazers_count}
  }).sort((a, b) => b.value - a.value).slice(0,5);

  let mostForked = repos.map(({name, forks}) => {
    return {label: name, value: forks}
  }).sort((a, b) => b.value - a.value).slice(0,5);

  return <Wrapper className='section section-center'>
    <Pie3D data={languages} /> 
    <Column3D data={mostPopular} /> 
    <Doughnut2D data={stars} /> 
    <Bar3D data={mostForked} /> 
  </Wrapper>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
