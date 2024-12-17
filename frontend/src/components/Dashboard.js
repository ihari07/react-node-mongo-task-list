import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [editListId, setEditListId] = useState(null);
  const [editListName, setEditListName] = useState('');
  const navigate = useNavigate();

  // Fetch all lists
  const fetchLists = async () => {
    try {
      const response = await API.get('/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  // Add a new list
  const addList = async () => {
    if (!newListName.trim()) return alert('List name is required');
    try {
      await API.post('/lists', { name: newListName });
      setNewListName('');
      fetchLists();
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  // Edit a list name
  const updateList = async (id) => {
    if (!editListName.trim()) return alert('List name is required');
    try {
      await API.put(`/lists/${id}`, { name: editListName });
      setEditListId(null);
      setEditListName('');
      fetchLists();
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  // Delete a list
  const deleteList = async (id) => {
    try {
      await API.delete(`/lists/${id}`);
      fetchLists();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>

      {/* Add New List */}
      <div>
        <input
          type="text"
          placeholder="New List Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={addList}>Add List</button>
      </div>

      {/* Display Lists */}
      <ul>
        {lists.map((list) => (
          <li key={list._id}>
            {editListId === list._id ? (
              <>
                <input
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                />
                <button onClick={() => updateList(list._id)}>Save</button>
                <button onClick={() => setEditListId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{list.name}</span>
                <button onClick={() => navigate(`/list/${list._id}`)}>View</button>
                <button onClick={() => {
                  setEditListId(list._id);
                  setEditListName(list.name);
                }}>Edit</button>
                <button onClick={() => deleteList(list._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
