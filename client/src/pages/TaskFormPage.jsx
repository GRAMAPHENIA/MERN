import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Save from "../components/iconos/Save";
dayjs.extend(utc);

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.date).format()
      });
      updateTask(params.id, data);
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format()
      });
    }
    navigate("/tasks");
  });

  return (
    <section className="flex h-[calc(100vh-120px)] items-center justify-center">
      <div className="bg-[#191d22] max-w-md w-full p-10 rounded-md border border-white/10 shadow-lg">
        <form onSubmit={onSubmit}>
          <label className="text-slate-500" htmlFor="title">
            TAREA
          </label>

          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-4"
            autoFocus
          />

          <label className="text-gray-400" htmlFor="description">
            DESCRIPCION
          </label>
          <textarea
            rows="3"
            placeholder="Descripción..."
            {...register("description")}
            className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-4"
          ></textarea>

          <label className="text-gray-400" htmlFor="date">
            FECHA
          </label>
          <input
            type="date"
            {...register("date")}
            className="custom-icon w-full bg-zinc-800 text-white px-4 py-2 rounded-md my-4"
          />
          <button className="font-thin flex justify-end hover:bg-gray-800 transition-all ease-in-out mt-2 py-1 px-2 rounded-lg">
            <Save />
          </button>
        </form>
      </div>
    </section>
  );
}
