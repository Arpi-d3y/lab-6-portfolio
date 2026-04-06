import { useMemo, useState } from 'react';
import skills from '../data/skills';

function About() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(skills.map((skill) => skill.category))];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || skill.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      <h1>About Me</h1>
      <p>
        I am a Computer Science student at Dalhousie University with experience in software development,
        web technologies, and user-centered design. I enjoy building projects that are functional,
        accessible, and visually clean.
      </p>

      <h2 className="mt-4">Education</h2>
      <p>Bachelor of Computer Science, Dalhousie University</p>

      <h2 className="mt-4">Technical Expertise</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="skillSearch" className="form-label">Search Skills</label>
          <input
            id="skillSearch"
            type="text"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a skill"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="categoryFilter" className="form-label">Filter by Category</label>
          <select
            id="categoryFilter"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill.name} className="col-sm-6 col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6 mb-1">{skill.name}</h3>
                  <small>{skill.category}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matching skills found.</p>
        )}
      </div>
    </div>
  );
}

export default About;