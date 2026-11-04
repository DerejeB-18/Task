function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
      />
      <span className={task.completed ? 'completed-text' : ''}>
        {task.title}
      </span>
      {/* Wire up the delete button click */}
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;