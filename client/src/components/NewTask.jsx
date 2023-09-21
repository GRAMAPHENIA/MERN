
export default function NewTask() {
  return (
    <section className="bg-[#191d22] hover:bg-[#242a31] transition-all ease-in-out border border-white/10 p-2 sm:p-4 rounded-[100%]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-text-plus"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19 10h-14"></path>
        <path d="M5 6h14"></path>
        <path d="M14 14h-9"></path>
        <path d="M5 18h6"></path>
        <path d="M18 15v6"></path>
        <path d="M15 18h6"></path>
      </svg>
    </section>
  );
}
