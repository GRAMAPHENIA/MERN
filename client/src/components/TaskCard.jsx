import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import Editar from "./iconos/Editar";
import Trash from "./iconos/Trash";
import Pin from "./iconos/Pin";
// import { utc } from "dayjs/plugin/utc";

// days.extend(utc)

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <>
      <section>
        <div className="bg-[#191d22] text-slate-400/50 border border-white/10 shadow-lg max-w-md w-full py-5 px-10  rounded-md">
          <div className="flex justify-end pb-5">
            <Pin />
          </div>
          <header className="flex justify-between mb-10">
            <h1 className="text-xl text-slate-200 font-thin">
              <span className="text-slate-200 capitalize">{task.title}</span>
            </h1>
            {/* <p className="bg-slate-600/20 py-1 px-2 rounded-lg text-gray-300 mt-10 font-thin text-end select-none">
              {new Date(task.date).toLocaleDateString()}
            </p> */}
            <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
          </header>
          {/* <p className="text-xl text-slate-200 font-thin pb-4">Comentario: </p> */}
          <p className="text-slate-400 font-thin bg-[#1e242c] p-2 rounded">
            <code className="">{task.description}</code>
          </p>

          <div className="flex justify-end mt-10">
            <Link
              to={`/tasks/${task._id}`}
              className="font-thin hover:bg-gray-800 transition-all ease-in-out py-2 px-2 rounded-lg"
            >
              <Editar />
            </Link>

            <button
              className="font-thin hover:bg-gray-800 transition-all ease-in-out py-2 px-2 rounded-lg"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
