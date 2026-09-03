import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/admin.css'
import { eraseToken, readToken } from '../services/session';
import { addClass, addSection, deleteClass, deleteSection, getAllInSection, getAllSections, verifyToken } from '../services/routes';
import Session from '../services/Session.jsx';

const Admin = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('SCIENCE');
  const [classList, setClassList] = useState([]);
  const [sections, setSections] = useState([]);
  const [newName, setNewName] = useState('');

  const fetchClasses = useCallback(async (sectionName) => {
    const res = await getAllInSection(sectionName);
    setClassList(res.data || []);
  }, []);

  const fetchSections = useCallback(async () => {
    const res = await getAllSections();
    if (res.success) setSections(res.massage);
  }, []);

  useEffect(() => {
    if (selectedSection.toUpperCase()) fetchClasses(selectedSection.toUpperCase());
  }, [selectedSection.toUpperCase(), fetchClasses]);

  const handleLogout = () => {
    eraseToken();
    navigate('/');
  };

  const handleAddSection = async () => {
    if (!newName.toUpperCase().trim()) return;
    await addSection(newName.toUpperCase());
    setNewName('');
    fetchSections();
  };

  const handleAddClass = async () => {
    if (!newName.trim()) return;
    await addClass({ name: newName.toUpperCase(), section: selectedSection.toUpperCase() });
    setNewName('');
    fetchClasses(selectedSection.toUpperCase());
  };

  const handleDeleteSection = async () => {
    const status = await deleteSection(selectedSection.toUpperCase());
    fetchClasses(selectedSection.toUpperCase());
    fetchSections()
    setNewName('');
  }

  const handleDeleteClass = async () => {
    deleteClass(selectedSection.toUpperCase(), newName.toUpperCase())
    fetchClasses(selectedSection.toUpperCase());
    setNewName('');
  }
  useEffect(() => {
    fetchSections();
  }, [])

  useEffect(() => {
    const id = setInterval(() => fetchClasses(selectedSection.toUpperCase()), 5000);
    return () => clearInterval(id);
  }, [selectedSection, fetchClasses]);
  return (
    <div>
      <Session requiredRole="admin" optionalRole="user" />

      <div id="title-pane">
        <span id="app-name">Attendly Administration</span>
      </div>

      <div id="application-header">
        <div id="section-filter-buttons-container">
          {sections.length > 0 ? sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSection(s.name)}
              className={selectedSection === s.name ? "active" : ""}
            >
              {s.name}
            </button>
          )) : 'No Sections Available'}
        </div>
      </div>

      <div id="record-container">
        <table id="recors-viewer">
          <thead>
            <tr><td>Class</td><td>Teacher In</td><td>Teacher</td><td>Relief Teacher</td></tr>
          </thead>
          <tbody>
            {classList.length == 0 ? <tr> <td colSpan={4}>No Class</td></tr> : classList.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.teacherIn}</td>
                  <td>{c.teacher}</td>
                  <td>{c.rTeacher}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div id="application-footer">
        <input
          type="text"
          className='secondary-s'
          placeholder='Enter Name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(0,0,0,0.1)', background: '#f5f5f7', outline: 'none' }}
        />
        <button className="primary" onClick={handleAddSection}>ADD NEW SECTION</button>
        <button className="secondary" onClick={handleAddClass}>ADD NEW CLASS</button>
        <button className="primary-s" onClick={handleDeleteSection}>DELETE SECTION</button>
        <button className="primary-s" onClick={handleDeleteClass}>DELETE CLASS</button>
        <button className="primary-s" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Admin;