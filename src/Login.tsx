import React from 'react';
import { Stack, Text, FontWeights, PrimaryButton, IStackTokens, DefaultButton} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField'

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export interface LoginButtonProps {
    disabled?: boolean;
    checked?: boolean;
}

const stackTokens: IStackTokens { childrenGap: 40 };
export const Login: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
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
        Login to your account
    </Text>
        <Stack gap={20}>
            <TextField label="Username:" underlined required  placeholder="Your email address" id="username" autoComplete="email" />
            <TextField label="Password:" underlined required placeholder="Your Password" id="password" autoComplete="password" type='password' />
        </Stack>

        <Stack horizontal tokens={stackTokens}>
            <PrimaryButton text="Login" onClick={_alertClicked} allowDisabledFocus/>
            <DefaultButton text="Reset" onClick={_resetContents} allowDisabledFocus/>
        </Stack>

    </Stack>
  );
};

function _alertClicked(): void {
    alert('Clicked');
}

function _resetContents(): void {
    var name = document.getElementById("username")
    var pass = document.getElementById("password")
}