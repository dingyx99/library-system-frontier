import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';

import logo from './fabric.png';

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="start"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c'
        }
      }}
      gap={15}
    >
      <Text variant="xxLarge" styles={boldStyle}>
        Register as a member
      </Text>
      
    </Stack>
  );
};
