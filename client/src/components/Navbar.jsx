import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import InDoor from "./InDoor";
import LogRegister from "./LogRegister";
import Connected from "./Connected";
import NewTask from "./NewTask";
import OutLog from "./OutLog";
import Back from "./iconos/Back";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="mt-7 flex justify-between py-2 px-3 rounded-lg">
      <Link
        className="bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 rounded-[50%]"
        to={isAuthenticated ? "/tasks" : "/"}
      >
        <Logo />
      </Link>

      <ul className="flex gap-x-4 items-center">
        {isAuthenticated ? (
          <>
            <div className="fixed top-[40px] left-[20px]">
              <Link to={"/"}>
                <Back />
              </Link>
            </div>

            <Link
              className="flex flex-col items-center  fixed bottom-10 right-[5px] sm:-right-[1350px] md:left-8"
              to="/Add-Task"
            >
              <NewTask />
              <p className="text-gray-400">Nueva</p>
            </Link>

            <li className="flex text-teal-400 items-center bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 rounded select-none">
              <Connected />
              <h1 className="text-gray-400 capitalize">{user.username}</h1>
            </li>

            <li className="flex  text-rose-600 bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 rounded-[50%]">
              <Link
                className="flex items-center gap-2"
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                <OutLog />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className="flex text-slate-200 gap-2 items-center bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 rounded-[50%]"
                to="/login"
              >
                <InDoor />
              </Link>
            </li>
            <li>
              <Link
                className="flex text-slate-200 gap-2 items-center bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 rounded-[50%]"
                to="/register"
              >
                <LogRegister />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
