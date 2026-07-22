import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "",
  status: "Pending",
  dueDate: "",
};

const getTodayDate = () => {
  const currentDate = new Date();

  currentDate.setMinutes(
    currentDate.getMinutes() -
      currentDate.getTimezoneOffset()
  );

  return currentDate.toISOString().split("T")[0];
};

export default function TaskFormModal({
  isOpen,
  task,
  onClose,
  onSave,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(task);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        status: task.status || "Pending",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData({
        ...emptyForm,
        dueDate: getTodayDate(),
      });
    }

    setErrors({});
  }, [isOpen, task]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
    } else if (
      formData.dueDate < getTodayDate() &&
      formData.dueDate !== task?.dueDate
    ) {
      newErrors.dueDate =
        "Due date cannot be earlier than today.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      await onSave({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="taskModalTitle"
      >
        <div className="modal-header">
          <div>
            <p className="section-label">
              {isEditing
                ? "Update task"
                : "New task"}
            </p>

            <h3 id="taskModalTitle">
              {isEditing
                ? "Edit task details"
                : "Create a new task"}
            </h3>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close task form"
          >
            Close
          </button>
        </div>

        <form
          className="task-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-field full-field">
            <label htmlFor="title">
              Task title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              maxLength="150"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a clear task title"
            />

            {errors.title && (
              <span className="field-error">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-field full-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              maxLength="2000"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add useful information about this task"
            />
          </div>

          <div className="form-field">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">
                Select priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">
                Medium
              </option>
              <option value="High">High</option>
            </select>

            {errors.priority && (
              <span className="field-error">
                {errors.priority}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">
                Pending
              </option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>

            {errors.status && (
              <span className="field-error">
                {errors.status}
              </span>
            )}
          </div>

          <div className="form-field full-field">
            <label htmlFor="dueDate">
              Due date
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              min={getTodayDate()}
              value={formData.dueDate}
              onChange={handleChange}
            />

            {errors.dueDate && (
              <span className="field-error">
                {errors.dueDate}
              </span>
            )}
          </div>

          <div className="modal-actions full-field">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}