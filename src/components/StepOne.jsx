import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const StepOne = ({
  handleSubmit,
  data,
  handleChange,
  showPassword,
  togglePasswordVisibility,
  isEmailValid,
  isPasswordValid,
}) => {
  return (
    <>
      <VStack w="100%">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack w="100%" gap="18px">
            <FormControl w="100%">
              <Input
                type="email"
                h="48px"
                placeholder="Please enter your Phone Number or Email"
                bg="0 0"
                border="1px solid #cbced5"
                borderRadius="6px"
                color="2e3346"
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                value={data.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>

            <VStack spacing={0} alignItems="flex-end" w="100%">
              <FormControl>
                <InputGroup>
                  <Input
                    h="48px"
                    type={showPassword ? "text" : "password"}
                    placeholder="Please enter your password"
                    bg="0 0"
                    border="1px solid #cbced5"
                    borderRadius="6px"
                    color="2e3346"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
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
                        <RxEyeClosed size="1.5rem" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                mt="-5px"
                variant="unstyled"
                fontSize="14px"
                color="#858b9c"
                cursor="pointer"
              >
                Forgot password?
              </Button>
            </VStack>
          </VStack>

          <Button
            bg="#f57224"
            variant="solid"
            w="100%"
            color="#fff"
            fontSize="16px"
            fontWeight="500"
            lineHeight="40px"
            type="submit"
            isDisabled={!isEmailValid || !isPasswordValid}
            _hover={{ bg: "#1e71ff" }}
          >
            LOGIN
          </Button>
        </form>

        <HStack spacing="6px">
          <Text color="#858b9c" fontSize="14px">
            Don't have an account?
          </Text>
          <Button variant="unstyled" fontSize="14px" color="#1e71ff">
            Sign up
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default StepOne;
