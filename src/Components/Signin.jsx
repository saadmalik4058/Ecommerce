import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import Context from "./Context/Context";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 character long")
    .max(10, "Max 10 character"),
});
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();
  const token = "token";
  const ctx = useContext(Context);
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const onSubmit = (data) => {
    let findeduser = ctx.getItem(data, token);
    if (findeduser) {
      localStorage.setItem("userEmail", data.email);
      navigate("/Dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex
       flex-col items-center h-screen justify-center "
    >
      <div className="p-10 bg-gray-100 rounded-md shadow-lg">
        <div className="shadow-lg flex bg-white flex-col gap-6 rounded-xl m-4 p-5 ">
          <div
            className="flex
           justify-center font-bold "
          >
            <h1> Website Login</h1>
          </div>
          <div
            className="flex
       gap-3"
          >
            <div className="flex flex-col">
              <div className="flex gap-10">
                <label htmlFor="email">Email</label>
                <input
                  className="border-2 rounded-md"
                  type="email"
                  {...register("email")}
                />
              </div>

              {errors.email && !emailValue && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div
            className="flex
         gap-3"
          >
            <div className="flex flex-col">
              <div className="flex gap-3">
                <label htmlFor="password">Password</label>
                <input
                  className="border-2 rounded-md"
                  type="password"
                  {...register("password")}
                />
              </div>
              {errors.password && !passwordValue && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="bg-green-300 rounded-md p-2 ">
            {" "}
            Signin
          </button>
          <p>
            Did'nt have an account ?
            <Link to={"/signup"}>
              {" "}
              <button className="bg-green-300 rounded-md p-2 ">
                Signup
              </button>{" "}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signin;
