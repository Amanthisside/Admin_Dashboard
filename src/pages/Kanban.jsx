import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, User, Calendar, Flag } from 'lucide-react';

const Kanban = () => {
  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'To Do',
      color: '#64748b',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new landing page',
          assignee: 'John Doe',
          dueDate: '2024-03-20',
          priority: 'high',
          tags: ['Design', 'UI/UX']
        },
        {
          id: '2',
          title: 'Setup database schema',
          description: 'Design and implement the database structure',
          assignee: 'Jane Smith',
          dueDate: '2024-03-18',
          priority: 'medium',
          tags: ['Backend', 'Database']
        }
      ]
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      color: '#3b82f6',
      tasks: [
        {
          id: '3',
          title: 'Implement user authentication',
          description: 'Add login and registration functionality',
          assignee: 'Mike Johnson',
          dueDate: '2024-03-22',
          priority: 'high',
          tags: ['Frontend', 'Auth']
        },
        {
          id: '4',
          title: 'Write API documentation',
          description: 'Document all API endpoints and usage examples',
          assignee: 'Sarah Wilson',
          dueDate: '2024-03-25',
          priority: 'low',
          tags: ['Documentation', 'API']
        }
      ]
    },
    'review': {
      id: 'review',
      title: 'Review',
      color: '#f59e0b',
      tasks: [
        {
          id: '5',
          title: 'Code review for payment module',
          description: 'Review and test the payment integration code',
          assignee: 'Tom Brown',
          dueDate: '2024-03-19',
          priority: 'high',
          tags: ['Review', 'Payment']
        }
      ]
    },
    'done': {
      id: 'done',
      title: 'Done',
      color: '#10b981',
      tasks: [
        {
          id: '6',
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          assignee: 'Lisa Davis',
          dueDate: '2024-03-15',
          priority: 'medium',
          tags: ['DevOps', 'CI/CD']
        },
        {
          id: '7',
          title: 'Create project documentation',
          description: 'Write comprehensive project setup and usage guide',
          assignee: 'David Miller',
          dueDate: '2024-03-12',
          priority: 'low',
          tags: ['Documentation']
        }
      ]
    }
  });

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    tags: []
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.tasks);
      const [removed] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, removed);

      const newColumn = {
        ...start,
        tasks: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.tasks);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasks: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.tasks);
    finishTaskIds.splice(destination.index, 0, removed);
    const newFinish = {
      ...finish,
      tasks: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--accent-danger)';
      case 'medium':
        return 'var(--accent-warning)';
      case 'low':
        return 'var(--accent-secondary)';
      default:
        return 'var(--text-muted)';
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now().toString(),
      ...newTask,
      tags: newTask.tags.filter(tag => tag.trim() !== '')
    };

    setColumns({
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        tasks: [...columns[selectedColumn].tasks, task]
      }
    });

    setNewTask({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      priority: 'medium',
      tags: []
    });
    setShowTaskForm(false);
  };

  const addNewColumn = () => {
    const columnId = `column-${Date.now()}`;
    const newColumn = {
      id: columnId,
      title: 'New Column',
      color: '#64748b',
      tasks: []
    };
    setColumns({
      ...columns,
      [columnId]: newColumn
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>
            Project Board
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary"
              onClick={addNewColumn}
            >
              <Plus size={16} />
              Add Column
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowTaskForm(true)}
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your projects with drag-and-drop Kanban boards.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto',
          paddingBottom: '20px'
        }}>
          {Object.values(columns).map((column) => (
            <div key={column.id} style={{ minWidth: '300px' }}>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="kanban-column"
                    style={{
                      backgroundColor: snapshot.isDraggingOver 
                        ? 'var(--bg-secondary)' 
                        : 'var(--bg-tertiary)'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: column.color,
                          borderRadius: '50%'
                        }} />
                        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>
                          {column.title}
                        </h3>
                        <span style={{
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-secondary)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {column.tasks.length}
                        </span>
                      </div>
                      <button 
                        className="btn btn-secondary"
                        style={{ padding: '4px' }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="kanban-card"
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging 
                                  ? `${provided.draggableProps.style?.transform} rotate(5deg)`
                                  : provided.draggableProps.style?.transform,
                                opacity: snapshot.isDragging ? 0.9 : 1
                              }}
                            >
                              <div style={{ marginBottom: '12px' }}>
                                <h4 style={{ 
                                  fontSize: '14px', 
                                  fontWeight: '600',
                                  marginBottom: '6px'
                                }}>
                                  {task.title}
                                </h4>
                                <p style={{ 
                                  fontSize: '12px', 
                                  color: 'var(--text-secondary)',
                                  lineHeight: '1.4'
                                }}>
                                  {task.description}
                                </p>
                              </div>

                              {task.tags.length > 0 && (
                                <div style={{ 
                                  display: 'flex', 
                                  flexWrap: 'wrap', 
                                  gap: '4px',
                                  marginBottom: '12px'
                                }}>
                                  {task.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      style={{
                                        backgroundColor: 'var(--bg-tertiary)',
                                        color: 'var(--text-secondary)',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        fontWeight: '500'
                                      }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                fontSize: '12px',
                                color: 'var(--text-secondary)'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <User size={12} />
                                  <span>{task.assignee}</span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={12} />
                                    <span>{task.dueDate}</span>
                                  </div>
                                  
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Flag 
                                      size={12} 
                                      style={{ color: getPriorityColor(task.priority) }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {showTaskForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ 
            padding: '24px', 
            width: '90%', 
            maxWidth: '500px',
            margin: '20px'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Task</h3>
            
            <form onSubmit={handleAddTask}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Task Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Description
                </label>
                <textarea
                  className="input"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Assignee
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Priority
                  </label>
                  <select
                    className="input"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    style={{ width: '100%' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Column
                  </label>
                  <select
                    className="input"
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    {Object.values(columns).map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  className="input"
                  value={newTask.tags.join(', ')}
                  onChange={(e) => setNewTask({
                    ...newTask, 
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  placeholder="Design, Frontend, API"
                  style={{ width: '100%' }}
                />
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end'
              }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;