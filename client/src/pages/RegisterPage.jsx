import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-120px)] items-center justify-center">
      <div className="bg-[#191d22] border-white/10 shadow-lg max-w-md w-full p-10 rounded-md border ">
        {registerErrors.map((error, i) => (
          <div className="bg-rose-500/20 rounded-lg p-2 text-white my-4" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl text-sky-400 font-bold">REGISTRO</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Usuario"
          />
          {errors.username && (
            <p className=" text-gray-300 font-thin"><span className="text-rose-600">*</span> El usuario es requerido</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className=" text-gray-300 font-thin"><span className="text-rose-600">*</span> El email es requerido</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className=" text-gray-300 font-thin"><span className="text-rose-600">*</span> La contraseña es requerido</p>
          )}

          <button className="py-2 px-4 my-4 border border-white/20 rounded bg-sky-500/20 hover:bg-zinc-800" type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tenes una cuenta?{" "}
          <Link className="text-sky-400" to="/login">
            Ingresa
          </Link>
        </p>
      </div>
    </div>
  );
}
