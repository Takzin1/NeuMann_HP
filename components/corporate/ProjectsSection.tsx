import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/corporate/ProjectCard";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { projects, projectsSection } from "@/lib/site";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 bg-paper py-24 lg:py-32"
      aria-label="Projects"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <SectionTitle
            eyebrow={projectsSection.eyebrow}
            heading={projectsSection.heading}
            lead={projectsSection.lead}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 90}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
