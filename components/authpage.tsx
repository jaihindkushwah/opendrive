"use client";

import { userService } from "@/services/user/service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { AxiosError } from "axios";

export function LoginForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) return;
    try {
      const res = await userService.login(
        email.toString(),
        password.toString()
      );
      const result = await res.data;
      if (!result.data) return;
      window.history.go(0);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || error.message, {
          position: "top-right",
          icon: <Info className="text-red-500 mr-3" />,
        });
        return;
      }
      toast("Something went wrong", {
        position: "top-right",
        icon: <Info className="text-red-500 mr-3" />,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full gap-2 flex flex-col">
            <Input
              name="email"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="text"
              placeholder="Please enter email"
              required
            />
            <Input
              name="password"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="password"
              placeholder="Please enter password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export function RegisterForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const rePassword = data.get("re-password");
    if (!email || !password || !name || !rePassword) return;
    if (password.toString() !== rePassword.toString()) return;
    try {
      const res = await userService.register(
        name.toString().trim(),
        email.toString(),
        password.toString()
      );
      const result = await res.data;
      if (!result.data) return;
      window.history.go(0);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || error.message, {
          position: "top-right",
          icon: <Info className="text-red-500 mr-3" />,
        });
        return;
      }
      toast("Something went wrong", {
        position: "top-right",
        icon: <Info className="text-red-500 mr-3" />,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up to your account</CardTitle>
          <CardDescription>
            Enter your details below to register to your account
          </CardDescription>
          {/* <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          <div className="w-full gap-2 flex flex-col">
            <Input
              name="name"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="text"
              placeholder="Please enter yout name"
              required
            />
            <Input
              name="email"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="text"
              placeholder="Please enter email"
              required
            />
            <Input
              name="password"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="password"
              placeholder="Please enter password"
              required
            />
            <Input
              name="re-password"
              className="bg-gray-100 p-1 rounded-sm px-2"
              type="password"
              placeholder="Please re-enter password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
