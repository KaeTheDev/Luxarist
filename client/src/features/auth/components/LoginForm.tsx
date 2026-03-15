import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../types";
import { Input } from "../../../common/ui/Input";
import { Button } from "../../../common/ui/Button";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const {
        register, // think: Registering this input field with the library
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Width Fields */}
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Minimum 8 characters"
        {...register("password")}
        error={errors.password?.message}
      />

<Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        isLoading={isLoading}
      >
        Login
      </Button>
        </form>
    )
}