import {authhandler} from "@/auth";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default async function Home() {
  const session = await authhandler.auth();
  return (
    <div>
      <h1>Hello World</h1>
      <Button
        as={Link}
        href="/members"
        color="primary"
        startContent={<FaRegSmile size={20} />}
        variant="bordered"
      >
        Click me
      </Button>
    </div>
  );
}
