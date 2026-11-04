import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from reloading[cite: 14]
    
    // Block empty titles
    if (!title.trim()) return;

    onAdd(title);
    setTitle(''); // Clear the input box
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;