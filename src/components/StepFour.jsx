import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";

const StepFour = ({ handleModalClose }) => {
  return (
    <>
      <VStack w="100%" h="100%">
        <Text bg="red" color="#fff" p="1rem" mb="2rem">
          Login Failed, Lazada wasn't allowed to access user data.
        </Text>
        <Text fontSize=".85vw" mb="1rem">
          Return to the homepage to try again
        </Text>
        <Button
          variant="solid"
          bg="#1e71ff"
          color="#fff"
          w="100%"
          onClick={handleModalClose}
        >
          Return To Homepage
        </Button>
      </VStack>
    </>
  );
};

export default StepFour;
