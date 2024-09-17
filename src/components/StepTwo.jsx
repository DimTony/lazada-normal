import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { io } from "socket.io-client";
import { LuMail } from "react-icons/lu";
import { maskEmail, SERVER_URL } from "../utils/reusables";

const socket = io(SERVER_URL);

const StepTwo = ({ adminResponse, setLgCurrentStep, handleNext }) => {
  return (
    <>
      <VStack w="100%" h="100%" justifyContent="space-between" pb="1rem">
        <Text fontWeight="500" fontSize="1rem">
          To protect your account security, we need to verify your identity,
          choose a way to verify:
        </Text>

        <Button
          variant="outline"
          gap="0.5rem"
          display="flex"
          alignItems="center"
          border="1px solid #eee"
          borderRadius="6px"
          _hover={{ border: "1px solid #888" }}
          w="100%"
          justifyContent="center"
          p="0.3rem"
          onClick={handleNext}
        >
          <LuMail color="#1e71ff" />

          <Text mb="0.3rem" fontWeight="400">
            {maskEmail(adminResponse.message)}
          </Text>
        </Button>

        <Button
          variant="outline"
          gap="0.5rem"
          display="flex"
          alignItems="center"
          border="1px solid #eee"
          borderRadius="6px"
          _hover={{ border: "1px solid #888" }}
          w="100%"
          justifyContent="center"
          p="0.3rem"
          onClick={() => setLgCurrentStep(1)}
        >
          Back
        </Button>
      </VStack>
    </>
  );
};

export default StepTwo;
