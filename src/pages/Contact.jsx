import { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false,
};

function Contact() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('contactDraft');
    return saved ? JSON.parse(saved) : initialForm;
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    localStorage.setItem('contactDraft', JSON.stringify(form));
  }, [form]);

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s'-]+$/.test(form.name.trim())) {
      newErrors.name = 'Name must contain letters only.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!/^[A-Za-z\s]+$/.test(form.subject.trim())) {
      newErrors.subject = 'Subject must contain letters only.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }

    if (!form.consent) {
      newErrors.consent = 'You must provide consent before submitting.';
    }

    return newErrors;
  };

  const sanitize = (text) => {
    return text.replace(/<[^>]*>?/gm, '').trim();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const newMessage = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      subject: sanitize(form.subject),
      message: sanitize(form.message),
      createdAt: new Date().toISOString(),
    };

    const existingMessages = JSON.parse(localStorage.getItem('submittedMessages')) || [];
    existingMessages.unshift(newMessage);
    localStorage.setItem('submittedMessages', JSON.stringify(existingMessages));

    setStatus('Message sent successfully.');
    setForm(initialForm);
    localStorage.removeItem('contactDraft');
    setErrors({});
  };

  return (
    <div>
      <h1>Contact</h1>
      <p>Have a question or want to connect? Send me a message.</p>

      {status && (
        <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
            value={form.subject}
            onChange={handleChange}
          />
          {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <div className="form-check mb-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
            checked={form.consent}
            onChange={handleChange}
          />
          <label htmlFor="consent" className="form-check-label">
            I consent to submitting this message.
          </label>
          {errors.consent && <div className="text-danger small mt-1">{errors.consent}</div>}
        </div>

        <button className="btn btn-primary" type="submit" disabled={!form.consent}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;