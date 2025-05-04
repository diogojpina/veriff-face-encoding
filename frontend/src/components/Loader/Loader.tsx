import { Box, Spinner } from "@chakra-ui/react";
import theme from "../../Themes";

export default function Loader() {
  return (
    <Box
      minW="100vw"
      minH="100vh"
      maxH="100vh"
      opacity="0.9"
      zIndex="999"
      position="fixed"
      top="0"
      left="0"
      bg={theme.color.quinary}
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor={theme.color.quaternary}
        color={theme.color.primary}
        size="xl"
      />
    </Box>
  );
}
