export const BaseUrl = "http://localhost:8080/api";
// export const BaseUrl = "https://genericbackend.onrender.com/api";

export const SERVER_URL = "http://localhost:8080";
// export const SERVER_URL = "https://genericbackend.onrender.com";

export const maskEmail = (email) => {
  // Basic email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email already contains asterisks
  if (email.includes("*")) {
    return email;
  }

  // Check if the input is a valid email
  if (!emailRegex.test(email)) {
    return "Invalid email";
  }

  // Split the email into local part and domain part
  const [localPart, domainPart] = email.split("@");

  // Mask the local part as needed
  const maskedLocalPart =
    localPart.length <= 3
      ? localPart + "*".repeat(6 - localPart.length) // Make total length of local part 6
      : localPart.slice(0, 3) + "*".repeat(localPart.length - 3); // Mask remaining characters if more than 3

  // Return the masked email
  return `${maskedLocalPart}@${domainPart}`;
};
