import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import './Table.css';
import { EditForm } from './Edit';


export const Table = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://66c77724732bf1b79fa6a0c7.mockapi.io/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`https://66c77724732bf1b79fa6a0c7.mockapi.io/data/${itemToDelete.id}`);
      setData(data.filter((item) => item.id !== itemToDelete.id));
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = () => {
    // Trigger data refresh
    setData((prevData) => prevData.map((d) => (d.id === editingItem.id ? editingItem : d)));
    setEditingItem(null);
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr className="table-header-row">
            <th>Roll Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="table-data-row">
              <td>{item.rollNumber}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
              <td>{item.department}</td>
              <td className="action-buttons">
                <button className="delete-button" onClick={() => handleDeleteClick(item)}>
                  <RiDeleteBin6Line />
                </button>
                <button className="edit-button" onClick={() => handleEditClick(item)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <button className='delete' onClick={handleDeleteConfirm}>Yes</button>
            <button className='edits' onClick={handleDeleteCancel}>No</button>
          </div>
        </div>
      )}

      {editingItem && (
        <EditForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};