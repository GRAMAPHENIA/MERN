import Presentacion from "../components/texto/Presentacion";

export default function HomePage() {
  return (
    <>
      <section className="flex bg-[#191d22] border border-white/10 shadow-lg mt-7 py-2 px-3 rounded-lg">
        <Presentacion />
      </section>
    </>
  );
}
