import { z } from "zod";
import { Info } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "../api-client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import placeholder from "../assets/placeholder.svg";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema } from "../lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      toast.success("Signed in successfully!");
      navigate("/");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => mutate(values);

  return (
    <div className="min-h-svh lg:grid lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src={placeholder}
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center py-12"
        >
          <Card className="mx-auto w-[384px] max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sign in</CardTitle>
              <CardDescription>
                Enter your information to sign in.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>Password</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Password must be at least 6 characters</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-800 transition duration-200 hover:bg-blue-700"
                >
                  Login
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Not registered?{" "}
                <Link to="/register" className="underline">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
