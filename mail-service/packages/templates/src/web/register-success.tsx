import { type RegistrationSuccessProps } from "@repo/gen";
import { EmailDocument } from "@repo/components";
import { Text } from "@react-email/components";

export const RegisterSuccess = ({
  fullName,
  email,
  userName,
}: RegistrationSuccessProps) => {
  return (
    <EmailDocument
      preview={"Registration Success"}
      heading={"Registration Success"}
      content={
        <>
          <Text>Hi {fullName} </Text>
          <Text>Email : {email}</Text>
          <Text>User Name : {userName}</Text>
        </>
      }
    />
  );
};
