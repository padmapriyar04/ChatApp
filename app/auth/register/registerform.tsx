"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { registerSchema, RegisterSchema } from "@/lib/schemas/registerschema";
import { registerUser } from "@/app/actions/authactions";

export default function Registerform() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onsubmit = async (data:RegisterSchema)=>{
    const result = await registerUser(data);
    console.log(result);
  }

  return (
    <Card className="mx-auto w-2/5">
      <CardHeader className="flex flex-col items-center justify-center text-secondary">
        <div className="flex justify-center items-center gap-2">
          <div>
            <GiPadlock size={40} />
          </div>
          <h1 className="font-semibold text-2xl">Register</h1>
        </div>
        <p className="text-2xl font-semibold mx-auto">Welcome to ChitChat!</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4">
            <Input
              label="name"
              variant="bordered"
              {...register("name")}
              errorMessage={errors.name?.message as string}
              isInvalid={!!errors.name}
            />
            <Input
              label="email"
              variant="bordered"
              {...register("email")}
              errorMessage={errors.email?.message as string}
              isInvalid={!!errors.email}
            />
            <Input
              label="password"
              variant="bordered"
              type="password"
              {...register("password")}
              errorMessage={errors.password?.message as string}
              isInvalid={!!errors.password}
            />
            <Button
              fullWidth
              isDisabled={!isValid}
              type="submit"
              color="secondary"
              className="text-1xl"
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
