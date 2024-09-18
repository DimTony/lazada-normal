import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";

const MobileStepFour = ({ t, handleModalClose }) => {
  return (
    <>
      <VStack w="100%" h="100%">
        <Text bg="red" color="#fff" p="1rem" mb="2rem">
          {t("mobileLoginFailed")}
        </Text>
        <Text fontSize="3.1vw" mb="1rem">
          {t("mobileReturnToHomepage")}
        </Text>
        <Button
          variant="solid"
          bg="#1e71ff"
          color="#fff"
          w="100%"
          onClick={handleModalClose}
        >
          {t("mobileReturn")}
        </Button>
      </VStack>
    </>
  );
};

export default MobileStepFour;
