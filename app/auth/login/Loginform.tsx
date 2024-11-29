'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { GiPadlock } from "react-icons/gi";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from "@/lib/schemas/loginschema";

export default function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver : zodResolver(loginSchema)
  });
  const onsubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary ">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-xl font-semibold">Login</h1>
          </div>
          <p className="text-xl font-semibold mx-auto">Welcome to Chitchat!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email", { required: true })}
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              {...register("password", { required: true })}
            />
            <Button fullWidth color="secondary" type="submit">
              Log in
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
