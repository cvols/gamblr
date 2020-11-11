import React from 'react';

import { Hero } from './components';

const HomePage = props => {
  console.log({ props });

  return <Hero {...props} />;
};

export default HomePage;
