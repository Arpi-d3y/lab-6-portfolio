import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not load projects.');
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <p>Here are some projects that reflect my technical and design experience.</p>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;