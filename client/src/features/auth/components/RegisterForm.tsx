import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../types";
import { Input } from "../../../common/ui/Input";
import { Button } from "../../../common/ui/Button";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    // State to track whether the admin field is visible
    const [showAdminField, setShowAdminField] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Row */}
      <div className="flex gap-4">
        <Input
          label="First Name"
          placeholder="Jane"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

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

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

         {/* Admin Toggle & Conditional Input */}
         <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAdminField(!showAdminField)}
          className="text-[10px] text-gray-400 uppercase tracking-[0.2em] hover:text-black transition-colors"
        >
          {showAdminField ? "- Hide Partner Access" : "+ Have an access code?"}
        </button>

        {showAdminField && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <Input
              label="Admin Passcode"
              type="password"
              placeholder="Enter your invitation code"
              {...register("adminPasscode")}
              error={errors.adminPasscode?.message}
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        isLoading={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
}