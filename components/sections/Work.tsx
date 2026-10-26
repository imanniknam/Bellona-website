import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { MiniCube, VoxelArt } from "../voxel/Voxel";
import type { Dict, PillarId } from "@/content/types";
import { featuredProjects, type Project, type ProjectTone } from "@/content/work";
import { localePath } from "@/lib/i18n";
import { ArrowIcon, LLink, SectionHead } from "../ui";
import { RollText } from "../RollText";

const toneCls: Record<ProjectTone, { box: string; label: string }> = {
  ink: { box: "bg-ink", label: "text-muted-dark" },
  orange: { box: "bg-orange", label: "text-ink" },
  paper: { box: "border border-line bg-paper", label: "text-muted" },
  graphite: { box: "bg-graphite", label: "text-muted-dark" },
};

const gapCls: Record<ProjectTone, string> = {
  ink: "stroke-ink",
  orange: "stroke-orange",
  paper: "stroke-paper",
  graphite: "stroke-graphite",
};

export function pillarShort(d: Dict, id: PillarId) {
  return d.pillars.items.find((p) => p.id === id)?.short ?? id;
}

/**
 * Project card. `compact` (home): thumbnail, name and sector. `full` (/work): bigger image, summary,
 * what we built, services and a visible link to the case study.
 */
export function ProjectCard({
  project,
  d,
  headingLevel = "h3",
  variant = "full",
}: {
  project: Project;
  d: Dict;
  headingLevel?: "h2" | "h3";
  variant?: "compact" | "full";
}) {
  const copy = project[d.locale];
  const tone = toneCls[project.tone];
  const isLink = project.status === "published";
  const compact = variant === "compact";
  const Heading = headingLevel;

  const media = (
    <div
      className={`lift relative flex aspect-[16/10] items-center justify-center overflow-hidden ${compact ? "rounded-[20px]" : "rounded-[28px]"} ${tone.box}`}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={compact ? "(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 620px, 100vw"}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <>
          <VoxelArt
            model={project.model ?? "cluster"}
            className={`w-auto ${project.model ? (compact ? "h-36 sm:h-44" : "h-40 sm:h-52") : "h-24 sm:h-32"}`}
            gap={gapCls[project.tone]}
            swap={project.tone === "orange" ? { o: "w" } : project.tone === "paper" ? {} : { k: "w" }}
            anim={project.model ? "rise" : undefined}
          />
          {!project.model && <span className={`absolute bottom-5 start-6 font-mono text-[13px] ${tone.label}`}>{d.work.placeholderImage}</span>}
        </>
      )}
    </div>
  );

  const chips = (
    <ul className="flex flex-wrap gap-1.5">
      {project.pillars.map((id) => (
        <li key={id} className="chip bg-paper text-ink">
          {pillarShort(d, id)}
        </li>
      ))}
    </ul>
  );

  const meta = compact ? (
    <div className="flex flex-col gap-1">
      <Heading className="text-xl font-bold tracking-[-0.01em] rtl:font-extrabold rtl:tracking-normal">{copy.title}</Heading>
      <p className="text-sm text-muted">{isLink ? copy.sector : d.work.placeholderNote}</p>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Heading className="fa-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{copy.title}</Heading>
          <p className="text-sm font-semibold text-orange-text">{isLink ? copy.sector : d.work.placeholderNote}</p>
        </div>
        {chips}
      </div>
      {isLink && (
        <>
          <p className="leading-relaxed text-body">{copy.summary}</p>
          <ul className="flex flex-col gap-1.5">
            {copy.built.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] text-muted">
                <MiniCube className="mt-1.5 size-3 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 font-semibold group-hover:text-orange-text">
            {d.work.view}
            <ArrowIcon size={16} />
          </span>
        </>
      )}
    </div>
  );

  if (!isLink) {
    return (
      <article className="group flex flex-col gap-4" data-placeholder="true">
        {media}
        {meta}
      </article>
    );
  }
  return (
    <article>
      <Link href={localePath(d.locale, `/work/${project.slug}`)} className="group flex flex-col gap-4 rounded-[28px]">
        {media}
        {meta}
        {compact && <span className="sr-only">{d.work.view}</span>}
      </Link>
    </article>
  );
}

export function Work({ d }: { d: Dict }) {
  const items = featuredProjects();
  return (
    <section id="work" aria-labelledby="work-title" className="section bg-surface">
      <div className="wrap flex flex-col gap-12">
        <SectionHead
          id="work-title"
          eyebrow={d.work.eyebrow}
          title={d.work.title}
          action={
            <LLink locale={d.locale} href="/work" className="btn btn-sm btn-ink" track="work_all">
              <RollText>{d.work.all}</RollText>
              <ArrowIcon />
            </LLink>
          }
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <li key={p.slug} data-reveal="clip" style={{ "--d": i } as CSSProperties}>
              <ProjectCard project={p} d={d} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
