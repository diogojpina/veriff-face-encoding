import { Box, Button, Flex } from "@chakra-ui/react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export default function DataTablePaginationMobile() {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      fontFamily="DM Sans"
      fontWeight="700"
    >
      <Button
        minW="98px"
        bg="none"
        border="1px solid #CFD9EA"
        borderRadius="0.375rem"
        _hover={{ bg: "none" }}
        disabled
        _disabled={{ color: "#4A5568", opacity: "0.9" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.5rem"
        color="#4A5568"
        fontSize="0.8125rem"
      >
        <Box fontSize="1.25rem">
          <BsArrowLeftShort />
        </Box>
        Anterior
      </Button>
      <Button
        minW="98px"
        bg="none"
        border="1px solid #CFD9EA"
        borderRadius="0.375rem"
        _hover={{ bg: "none" }}
        _disabled={{ color: "#4A5568", opacity: "0.9" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.5rem"
        color="#4A5568"
        fontSize="0.8125rem"
      >
        Próxima
        <Box fontSize="1.25rem">
          <BsArrowRightShort />
        </Box>
      </Button>
    </Flex>
  );
}
