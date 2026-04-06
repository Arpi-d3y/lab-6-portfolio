function ProjectCard({ project }) {
    return (
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h3 className="h5">{project.name}</h3>
            <p><strong>Author:</strong> {project.author}</p>
            <p><strong>Languages:</strong> {project.languages.join(', ')}</p>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProjectCard;