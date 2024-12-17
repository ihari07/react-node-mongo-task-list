import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const TaskList = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', details: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ title: '', details: '' });

  // Fetch list and items
  const fetchList = async () => {
    try {
      const response = await API.get('/lists');
      const matchedList = response.data.find((l) => l._id === listId);
      setList(matchedList);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  // Add a new item
  const addItem = async () => {
    if (!newItem.title.trim()) return alert('Title is required');
    try {
      await API.post(`/lists/${listId}/items`, newItem);
      setNewItem({ title: '', details: '' });
      fetchList();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Update an item
  const updateItem = async (itemId) => {
    if (!editItem.title.trim()) return alert('Title is required');
    try {
      await API.put(`/lists/${listId}/items/${itemId}`, editItem);
      setEditItemId(null);
      setEditItem({ title: '', details: '' });
      fetchList();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete an item
  const deleteItem = async (itemId) => {
    try {
      await API.delete(`/lists/${listId}/items/${itemId}`);
      fetchList();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (list?.tasks?.length === 0) {
    return <p>No tasks available</p>; // Or any other structure for no tasks
  }

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      {list ? (
        <>
          <h2>Task List: {list.name}</h2>

          {/* Add New Item */}
          <div>
            <input
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <input
              placeholder="Details"
              value={newItem.details}
              onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
            />
            <button onClick={addItem}>Add Item</button>
          </div>

          {/* Display Items */}
          <ul>
            {list.items.map((item) => (
              <li key={item._id}>
                {editItemId === item._id ? (
                  <>
                    <input
                      value={editItem.title}
                      onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    />
                    <input
                      value={editItem.details}
                      onChange={(e) => setEditItem({ ...editItem, details: e.target.value })}
                    />
                    <button onClick={() => updateItem(item._id)}>Save</button>
                    <button onClick={() => setEditItemId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>
                      <strong>{item.title}</strong>: {item.details}
                    </span>
                    <button onClick={() => {
                      setEditItemId(item._id);
                      setEditItem({ title: item.title, details: item.details });
                    }}>Edit</button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        // <p>Loading...</p>
        <p>No tasks available</p> // Or any other structure for no tasks
      )}
    </div>
  );
};

export default TaskList;
