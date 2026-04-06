import { Link } from 'react-router-dom';
import WeatherWidget from '../components/WeatherWidget';

function Home() {
  return (
    <div>
      <section className="p-4 p-md-5 rounded hero-section">
        <h1 className="display-5 fw-bold">Hi, I’m Arpi.</h1>
        <p className="lead">
          I’m a Computer Science student building thoughtful, user-focused digital work.
        </p>
        <p>
          This portfolio highlights my technical skills, projects, and ways to connect with me.
        </p>
        <Link to="/projects" className="btn btn-primary me-2">View Projects</Link>
        <Link to="/contact" className="btn btn-outline-primary">Contact Me</Link>
      </section>

      <WeatherWidget />
    </div>
  );
}

export default Home;