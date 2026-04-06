import { useEffect, useState } from 'react';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
          }

          const data = await response.json();
          setWeather({
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location permission denied. Cannot load weather.');
        setLoading(false);
      }
    );
  }, []);

  return (
    <section className="card shadow-sm mt-4">
      <div className="card-body">
        <h2 className="h4">Live Weather</h2>

        {loading && <p>Loading weather...</p>}
        {error && <p className="text-danger">{error}</p>}

        {weather && (
          <div>
            <p><strong>City:</strong> {weather.city}</p>
            <p><strong>Temperature:</strong> {weather.temp}°C</p>
            <p><strong>Humidity:</strong> {weather.humidity}%</p>
            <p><strong>Condition:</strong> {weather.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default WeatherWidget;