import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import WithSubnavigation from "./components/Nav";
import CallToActionWithIllustration from "./components/welcome";

export const App = () => (
  <ChakraProvider theme={theme}>
    <WithSubnavigation />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <CallToActionWithIllustration />
      </Grid>
    </Box>
  </ChakraProvider>
);
