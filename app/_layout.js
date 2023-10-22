import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

const Layout = () => {
  return (
    <RootSiblingParent>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </RootSiblingParent>
  );
};

export default Layout;
