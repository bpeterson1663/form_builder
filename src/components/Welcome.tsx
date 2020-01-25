import * as React from "react";

interface WelcomeProps {
  firstName: string;
  lastName: string;
}

const Welcome: React.FunctionComponent<WelcomeProps> = (props: WelcomeProps): JSX.Element => {
  return (
    <h2>
      Hello {props.firstName} {props.lastName}
    </h2>
  );
};

export default Welcome;
