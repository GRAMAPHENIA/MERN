import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Registro from "../components/iconos/Registro";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-120px)] items-center justify-center">
      <div className="bg-[#191d22] border border-white/10 shadow-lg max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div
            className="bg-rose-500/20 rounded-lg p-2 text-white my-4"
            key={i}
          >
            {error}
          </div>
        ))}

        <h1 className="text-2xl text-[#85b6f2] font-bold">INGRESAR</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-gray-300 font-thin">
              <span className="text-rose-600">*</span> El email es{" "}
              <span>requerido</span>
            </p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-gray-300 font-thin">
              <span className="text-rose-600">*</span> La contraseña es{" "}
              <span>requerido</span>
            </p>
          )}

          <button
            className="text-gray-400 hover:text-[#85b6f2] py-2 px-4 my-4 rounded bg-[#191d22] hover:bg-[#242a31] border border-white/10"
            type="submit"
          >
            <Registro/>
          </button>
        </form>

        <p>
          ¿No tenes una cuenta?{" "}
          <Link className="text-[#85b6f2]" to="/register">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
