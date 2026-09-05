import { ProjectRow } from "@/components/corporate/ProjectRow";
import { SectionTitle } from "@/components/corporate/SectionTitle";
import { projects, projectsSection } from "@/lib/site";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section border-t border-line bg-void"
      aria-label="Projects"
    >
      <div className="container-page">
        {/* 装飾 eyebrow は置かない。H2 単体で立たせる。 */}
        <SectionTitle
          heading={projectsSection.heading}
          lead={projectsSection.lead}
        />
        <ul className="mt-12 border-t border-line">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
