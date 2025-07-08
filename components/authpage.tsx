"use client";

import { userService } from "@/services/user.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) return;
    const res = await userService.login(email.toString(), password.toString());
    const result = await res.data;
    if (!result.data) return;
    window.history.go(0);
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="container max-w-80 gap-2 flex flex-col"
      >
        <input
          name="email"
          className="bg-gray-100 p-1 rounded-sm px-2"
          type="text"
          placeholder="Please enter text-Email"
        />
        <input
          name="password"
          className="bg-gray-100 p-1 rounded-sm px-2"
          type="text"
          placeholder="Please enter text-Password"
        />
        <button type="submit" className="px-2 py-1 bg-slate-100 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}

export function RegisterForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password || !name) return;
    const res = await userService.register(
      name.toString().trim(),
      email.toString(),
      password.toString()
    );
    const result = await res.data;
    if (!result.data) return;
    window.history.go(0);
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="container max-w-80 gap-2 flex flex-col"
      >
        <input
          name="name"
          className="bg-gray-100 p-1 rounded-sm px-2"
          type="text"
          placeholder="Please enter text-name"
        />
        <input
          name="email"
          className="bg-gray-100 p-1 rounded-sm px-2"
          type="text"
          placeholder="Please enter text-Email"
        />
        <input
          name="password"
          className="bg-gray-100 p-1 rounded-sm px-2"
          type="text"
          placeholder="Please enter text-Password"
        />
        <button type="submit" className="px-2 py-1 bg-slate-100 cursor-pointer">
          Register
        </button>
      </form>
    </div>
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
