import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
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
