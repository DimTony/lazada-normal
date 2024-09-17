import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { maskEmail } from "../utils/reusables";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const StepThree = ({ data, setData, handleResend, handleFinish, loading }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  // Start countdown timer on component mount
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [countdown]);

  // Update OTP in the parent component's state
  useEffect(() => {
    setData((prevData) => ({ ...prevData, otp: otp.join("") }));
  }, [otp, setData]);

  const canProceed = otp.every((digit) => digit !== "");

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      // Allow only a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      // Allow backspace or delete
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <VStack w="100%" h="100%">
          <Text fontSize="14px" mt="0.5rem" mb="0.5rem">
            Enter the 6-digit code sent to{" "}
            <span className="step3email">{maskEmail(data.email)}</span>
          </Text>

          <HStack justifyContent="center" gap="15px" mb="0.5rem">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={{
                  width: "45px",
                  height: "45px",
                  fontSize: "20px",
                  textAlign: "center",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </HStack>

          <HStack fontSize="14px" spacing="4px">
            <Text>Did not receive the code?</Text>
            <Button
              variant="unstyled"
              color="#1e71ff"
              fontSize="14px"
              onClick={handleResend}
              isDisabled={resendDisabled}
            >
              {resendDisabled ? `Resend (${countdown}s)` : "Resend"}
            </Button>
          </HStack>

          <Button
            variant="solid"
            bg="#1e71ff"
            _hover={{ bg: "#3b1eff" }}
            w="100%"
            color="#fff"
            borderRadius="10px"
            mb="1rem"
            isDisabled={!canProceed}
            onClick={handleFinish}
          >
            Next
          </Button>

          <Button
            variant="outline"
            border="1px solid #cdcdcd"
            _hover={{ border: "1px solid #888" }}
            w="100%"
            color="#888"
            borderRadius="10px"
          >
            Back
          </Button>
        </VStack>
      )}
    </>
  );
};

export default StepThree;
