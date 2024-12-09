"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { GiPadlock } from "react-icons/gi";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { loginSchema, LoginSchema } from "@/lib/schemas/loginschema";
import { signInUser } from "@/app/actions/authactions";
import { toast } from "react-toastify";

export default function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const router = useRouter();
  const onsubmit = async (data: LoginSchema) => {
    const res = await signInUser(data);

    if (res.status === "success") {
      router.push("/members");
      toast.success("Login in successful");
    } else {
      toast.error(res.error as string);
    }
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary ">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-xl font-semibold">Login</h1>
          </div>
          <p className="text-xl font-semibold mx-auto">
            Welcome back to Chitchat!
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              errorMessage={errors.email?.message as string}
              isInvalid={!!errors.email}
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              {...register("password")}
              errorMessage={errors.password?.message as string}
              isInvalid={!!errors.password}
            />
            <Button
              fullWidth
              color="secondary"
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
            >
              Log in
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
