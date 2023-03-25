import React from "react";
import { HStack, Banner, Button, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App = () => (
  <Banner
    illustration={props => (
      <Avatar
        color="primary"
        icon={props => <Icon name="wifi-off" {...props} />}
        {...props}
      />
    )}
    text="There was a problem processing a transaction on your credit card."
    buttons={
      <HStack spacing={2}>
        <Button key="fix-it" variant="text" title="Fix it" compact />
        <Button key="learn-more" variant="text" title="Learn More" compact />
      </HStack>
    }
  />
);

export default App;