import { useEffect, useState } from 'react';

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('submittedMessages')) || [];
    setMessages(stored);
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <p>Submitted contact messages are shown below.</p>

      {messages.length === 0 && <p>No messages yet.</p>}

      <div className="row">
        {messages.map((msg, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{msg.subject}</h2>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <small className="text-muted">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;