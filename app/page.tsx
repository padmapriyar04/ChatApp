import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Hello World</h1>
      <h3>User Session Data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              href="/members"
              startContent={<FaRegSmile size={20} />}
              variant="bordered"
            >
              Click me
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div>Not signed in</div>
          <Button
            as={Link}
            color="primary"
            href="/members"
            startContent={<FaRegSmile size={20} />}
            variant="bordered"
          >
            Click me
          </Button>
        </>
      )}
    </div>
  );
}
