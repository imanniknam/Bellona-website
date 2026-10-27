import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dict, TeamMember } from "@/content/types";
import { MiniCube } from "../voxel/Voxel";
import { Rich } from "../Rich";
import { Eyebrow, StickySplit } from "../ui";

function Avatar({ m, index }: { m: TeamMember; index: number }) {
  if (m.photo) {
    return <Image src={m.photo} alt={m.name} width={160} height={160} className="size-20 rounded-full object-cover" />;
  }
  return (
    <span
      aria-hidden="true"
      className={`flex size-20 items-center justify-center rounded-full text-2xl font-extrabold transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105 ${
        index % 2 === 0 ? "bg-ink text-paper" : "bg-orange text-ink"
      }`}
    >
      {m.initials}
    </span>
  );
}

/** Team cards: name, then role (most prominent), then skills, then field & university. */
export function Team({ d, headless = false }: { d: Dict; headless?: boolean }) {
  const { team } = d;
  return (
    <section id="team" aria-labelledby="team-title" className="section">
      <StickySplit
        wide
        head={
          headless ? (
            <h2 id="team-title" className="t-h2-sm">
              {team.eyebrow}
            </h2>
          ) : (
            <>
              <Eyebrow>{team.eyebrow}</Eyebrow>
              <h2 id="team-title" className="t-h2-sm">
                <Rich text={team.title} />
              </h2>
              <p className="t-lead text-body">{team.sub}</p>
            </>
          )
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {team.members.map((m, i) => (
            <li
              key={m.name}
              data-reveal="pop"
              style={{ "--d": i } as CSSProperties}
              className="card lift group flex flex-col gap-5 bg-surface p-7"
            >
              <Avatar m={m} index={i} />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold tracking-[-0.01em] rtl:font-extrabold rtl:tracking-normal">{m.name}</h3>
                <p className="self-start rounded-full bg-ink px-3 py-1 text-sm font-bold text-paper">{m.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="sr-only">{team.skillsLabel}</p>
                <ul className="flex flex-col gap-1.5">
                  {m.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-[15px] font-semibold">
                      <MiniCube className="size-3 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-auto border-t border-line pt-4 text-sm leading-relaxed text-muted">
                <span className="sr-only">{team.educationLabel}: </span>
                {m.education}
              </p>
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4">
                  LinkedIn<span className="sr-only"> {d.common.opensNewTab}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </StickySplit>
    </section>
  );
}
