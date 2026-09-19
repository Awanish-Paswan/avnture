import { Link } from "react-router-dom";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
      aria-label="Avnture Technologies home"
    >
      <span
        className={`grid h-11 w-11 overflow-hidden rounded-xl ${light ? "bg-white" : "bg-ink"}`}
      >
        <img
          src="/avnture-logo-192.png"
          alt=""
          width="44"
          height="44"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="text-[.92rem] font-extrabold uppercase leading-tight tracking-[.08em]">
        Avnture
        <br />
        <span className={light ? "text-white/55" : "text-slate-500"}>
          Technologies
        </span>
      </span>
    </Link>
  );
}
