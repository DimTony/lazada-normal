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
} from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/slide/1.jpg",
  "/slide/2.jpg",
  "/slide/3.jpg",
  "/slide/4.jpg",
  "/slide/5.jpg",
  "/slide/6.jpg",
  "/slide/7.jpg",
  "/slide/8.jpg",
];

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const handleModalClose = () => {
    window.location.href = "https://www.lazada.co.th/";
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [images.length]);

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
          <VStack w="100%" mb="2.5rem">
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

          <VStack w="100%">
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

      <Modal isOpen={isOpen} isCentered isClosable={false}>
        <ModalOverlay />
        <ModalContent w="444px" h="326.58px" maxW="444px" maxH="326.58px">
          <ModalHeader>
            <HStack justifyContent="center">
              <Text
                color="#2e3346"
                fontSize="16px"
                fontWeight="500"
                textAlign="center"
              >
                Login
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton onClick={handleModalClose} />
          <ModalBody px="36px">
            <VStack w="100%">
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
              >
                LOGIN
              </Button>

              <HStack spacing="6px">
                <Text color="#858b9c" fontSize="14px">
                  Don't have an account?
                </Text>
                <Button variant="unstyled" fontSize="14px" color="#1e71ff">
                  Sign up
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box display={{ base: "block", md: "none" }}>
        <Text>Mobile Here</Text>
      </Box>
    </>
  );
};

export default Landing;
