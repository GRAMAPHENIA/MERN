import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import ClipBoard from "../components/iconos/ClipBoard";

export default function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0)
    return (
      <h1 className="text-5xl sm:text-6xl flex justify-center items-center pt-40">
        Asignar Una Tarea
      </h1>
    );

  return (
    <>
      <div className="flex flex-col justify-center items-center py-10 sm:py-0">
        <div className="flex flex-col justify-center items-center bg-[#191d22] transition-all ease-in-out border border-white/10 p-5 rounded select-none">
          <ClipBoard />
          <h1 className="text-gray-500">ACTIVIDADES</h1>
        </div>
      </div>

      <div className="p-5 md:p-20 grid grid-cols-1 sm:grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
