import { auth } from "@/auth";
import SignOutButton from "./SignOut";
import SignInButton from "./SignIn";

export default async function AuthButtons() {
  const session = await auth();
  if (session) {
    return <SignOutButton />;
  }
  return <SignInButton />;
}
