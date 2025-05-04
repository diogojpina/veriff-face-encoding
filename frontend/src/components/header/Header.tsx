import { Link as ReactRouterLink } from "react-router-dom";
import {
  Container,
  Flex,
  HStack,
  Show,
  Link as ChakraLink,
} from "@chakra-ui/react";

import theme from "../../Themes";

export default function Header() {
  return (
    <Container id="header" maxWidth="100%" w="100%" p="0">
      <Flex w="full" bg={theme.color.quinary}>
        <HStack
          w="full"
          maxWidth="1024px"
          m="0 auto"
          p={{ base: "1rem", sm: "1rem" }}
          justifyContent="space-between"
          flexDirection={{ base: "column", sm: "column", md: "row" }}
        >
          Header
        </HStack>
      </Flex>
      <Flex w="full" bg={theme.color.quaternary} my="0.5rem">
        <HStack
          w="full"
          maxWidth="1024px"
          m="0.5rem auto"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
          }}
        ></HStack>
      </Flex>
    </Container>
  );
}
