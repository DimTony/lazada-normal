import {
  Image,
  VStack,
  HStack,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

const MobileMenu = ({
  onClose,
  isOpen,
  languages,
  changeLanguage,
  getCurrentLanguage,
}) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="20px">
        <DrawerHeader borderBottomWidth="1px">Select Language</DrawerHeader>
        <DrawerBody>
          <VStack spacing={2} align="stretch">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  onClose();
                }}
                bg={
                  getCurrentLanguage().code === lang.code ? "blue.100" : "white"
                }
                justifyContent="flex-start"
                variant="ghost"
              >
                <HStack spacing={2}>
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    h="1.5rem"
                    w="1.5rem"
                  />
                  <Text>{lang.name}</Text>
                </HStack>
              </Button>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
