import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import theme from "../Themes";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      direction="column"
      bg="white"
      gap={6}
    >
      <Text
        fontSize={{ base: "120px", md: "160px" }}
        fontWeight="bold"
        color="gray.200"
        lineHeight="1"
      >
        404
      </Text>

      <Text fontSize={{ base: "xl", md: "2xl" }} color="gray.600" mb={8}>
        Página não encontrada
      </Text>

      <Button
        onClick={() => navigate("/")}
        bg={theme.color.primary}
        color="white"
        size="lg"
        px={8}
        _hover={{
          bg: theme.color.secondary,
          transform: "translateY(-2px)",
          transition: "all 0.2s",
        }}
      >
        Voltar ao início
      </Button>
    </Flex>
  );
};

export default NotFound;
