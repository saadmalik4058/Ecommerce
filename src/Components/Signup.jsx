import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context/Context";

function Signup() {
  const navigate = useNavigate();
  const userSchema = z
    .object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be atleast 6 character long")
        .max(10, "Max 10 character"),
      confirmpassword: z.string(),
      role: z.enum(["user", "admin"], "Role is required"),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Password is not matched",
      path: ["confirmpassword"],
    });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const ctx = useContext(Context);
  function onSubmit(data) {
    ctx.setItem(data);
    localStorage.setItem("userEmail", data.email);
    navigate("/Dashboard");

    reset({
      email: "",
      password: "",
      confirmpassword: "",
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex
        flex-col items-center h-screen justify-center gap-5 "
    >
      <div
        className="flex
        gap-3 items-start"
      >
        <label htmlFor="email">Email</label>
        <input
          className="border-2 rounded-md"
          type="email"
          {...register("email")}
        />

        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div
        className="flex
          gap-3"
      >
        <label htmlFor="password">Password</label>
        <input
          className="border-2 rounded-md"
          type="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div
        className="flex
          gap-3"
      >
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          className="border-2 rounded-md"
          type="password"
          {...register("confirmpassword")}
        />
        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
      </div>
      <div className="flex gap-2">
        {/* <label htmlFor="Admin">Admin</label> */}
        <select {...register("role")}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      {/* <Link to={"/Home"} className="bg-green-300 rounded-md p-2 ">
          {" "}
          Signup
        </Link> */}
      <button type="submit" className="bg-green-300 rounded-md p-2 ">
        {" "}
        signup
      </button>
      <Link className="bg-green-300 rounded-md p-2 " to={"/"}>
        Back to SignIn
      </Link>
    </form>
  );
}

export default Signup;
