import React from "react";
import {
  Image,
  VStack,
  Stack,
  Button,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const MobileStepOne = ({
  t,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  data,
  handleChange,
  isEmailValid,
  isPasswordValid,
}) => {
  return (
    <>
      <VStack w="100%">
        <VStack mb="2.5rem" w="100%" alignItems="flex-start" gap="1.5rem">
          <VStack
            fontSize="1.5rem"
            fontWeight="500"
            alignItems="flex-start"
            spacing={0}
          >
            <Text>{t("mobileHi")} 👋</Text>
            <Text>{t("mobileWelcome")}</Text>
          </VStack>
        </VStack>

        <Stack mb="0.8rem" w="100%" alignItems="center">
          <Image
            src="/mobile-logo.svg"
            alt="mobile-logo"
            w="26.667vw"
            h="auto"
          />
        </Stack>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack w="100%" mb="2rem">
            <FormControl mb="2rem">
              <Input
                type="email"
                h="35.44px"
                placeholder={t("mobileEmailInput")}
                value={data.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  h="35.44px"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("mobilePasswordInput")}
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    variant="link"
                    pr="0.5rem"
                  >
                    {showPassword ? (
                      <RxEyeOpen size="1.5rem" />
                    ) : (
                      <RxEyeClosed size="1rem" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>

          <VStack w="100%" mb="1rem">
            <Button
              w="100%"
              color="#fff"
              bg="linear-gradient(90deg,#fe8e00,#fa2c99)"
              type="submit"
              isDisabled={!isEmailValid || !isPasswordValid}
            >
              {t("mobileLogin")}
            </Button>
            <Button
              mt="-5px"
              variant="unstyled"
              fontSize="3.467vw"
              fontWeight="500"
              lineHeight="4.4vw"
              textAlign="center"
              textTransform="capitalize"
              color="#1e71ff"
              cursor="pointer"
            >
              {t("mobileForgotPassword")}
            </Button>
          </VStack>
        </form>

        <Divider color="#eee" borderWidth="1px" mb="1rem" />

        <VStack spacing={0} w="100%">
          <Text
            color="#595f6d"
            fontSize="3.467vw"
            fontWeight="400"
            lineHeight="4.4vw"
            textAlign="center"
          >
            {t("mobileSignedUpYet")}
          </Text>
          <Button
            mt="-5px"
            variant="unstyled"
            fontSize="3.467vw"
            fontWeight="500"
            lineHeight="4.4vw"
            textAlign="center"
            textTransform="capitalize"
            color="#1e71ff"
            cursor="pointer"
          >
            {t("mobileSignUp")}
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default MobileStepOne;
