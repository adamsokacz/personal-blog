import { useState } from "react";
import type { Project, ProjectTopic } from "../../types";
import ProjectCard from "./ProjectCard";

const INITIAL_VISIBLE = 3;

type Props = {
  topic: ProjectTopic;
  projects: Project[];
};

export default function ProjectTopicSection({ topic, projects }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > INITIAL_VISIBLE;
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-semibold italic text-slate-800 sm:text-2xl">{topic}</h2>
      <div className="pl-4">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            category={project.category}
            organization={project.organization}
            bullets={project.bullets}
            links={project.links}
          />
        ))}
      </div>
      {hasMore && (
        <div className="mt-2 flex justify-center pl-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}
