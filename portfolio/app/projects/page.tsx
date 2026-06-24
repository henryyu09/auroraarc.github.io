import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects — Henry Yu",
  description: "Projects in quantum computing, machine learning, data science, and systems.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="px-6 py-20" style={{ maxWidth: "960px", margin: "0 auto" }}>
      <h1 className="font-display text-heading text-text-primary mb-2">Projects</h1>
      <p className="text-body text-text-secondary mb-10">
        Quantum computing, machine learning, data science, and systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First project featured as large */}
        {projects.length > 0 && (
          <div className="md:col-span-2">
            <ProjectCard
              key={projects[0].slug}
              title={projects[0].title}
              description={projects[0].description}
              tags={projects[0].tags}
              slug={projects[0].slug}
              large
            />
          </div>
        )}

        {projects.slice(1).map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            tags={project.tags}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
}
