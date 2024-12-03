import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';

function Todo() {
  const [tasks, setTasks] = useState(() => {
    // Load from localStorage during initialization
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : []; // Fallback to an empty array if no tasks are found
  });
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);


  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert the array to a JSON string
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) {
      alert('Write your tasks before adding');
    } else {
      if (!editId) {
        let obj = {
          task: input,
          id: Math.trunc(Math.random() * 10000),
        };
        setTasks([...tasks, obj]);
        setInput('');
      } else {
        let newTasks = tasks.map((ele) => {
          if (ele.id === editId) {
            ele.task = input;
          }
          return ele;
        });
        setTasks(newTasks);
        setInput('');
        setEditId(null);
      }
    }
  };

  const deleteTask = (id) => {
    let newTasks = tasks.filter((ele) => ele.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id) => {
    setEditId(id);
    let editTask = tasks.find((ele) => ele.id === id);
    setInput(editTask.task);
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-orange-200 p-4">
        <div className="px-4 py-8 h-auto w-auto max-w-md bg-gray-700 rounded-lg shadow-xl">
          <h1 className="text-center text-white text-2xl mb-2">Todo-List</h1>
          <div className="py-4 px-8 flex flex-col sm:flex-row gap-3">
            <input
              className="w-full sm:w-60 px-3 py-2 bg-black text-gray-200 border border-gray-200 rounded-lg"
              type="text"
              placeholder="Enter a Todo...."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="px-3 py-2 bg-orange-300 rounded-lg hover:bg-orange-400 transition-colors duration-300"
              onClick={addTask}
            >
              {editId ? 'UPDATE' : 'ADD'}
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {tasks.map((e) => {
              return (
                <div
                  key={e.id}
                  className="flex flex-wrap justify-between gap-2 px-4 py-2 text-white border border-white rounded-xl mx-8 mb-3 bg-gray-800"
                >
                  <h4 className="flex-1">{e.task}</h4>
                  <div className="flex gap-2">
                    <button className="text-red-400 hover:scale-110 transition-transform duration-200">
                      <i className="bi bi-check-circle-fill"></i>
                    </button>
                    <button
                      className="text-green-400 hover:scale-110 transition-transform duration-200"
                      onClick={() => editTask(e.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="text-blue-400 hover:scale-110 transition-transform duration-200"
                      onClick={() => deleteTask(e.id)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
