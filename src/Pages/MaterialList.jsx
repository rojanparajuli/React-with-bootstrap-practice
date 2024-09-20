import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Media_Url from '../../mediaUrl';

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://192.168.0.148:8001/api/pdf/list/');
        setMaterials(response.data.pdfs);
      } catch (err) {
        setError('Error fetching materials');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="material-list-container">
      <h1 className="material-list-title">Study Materials</h1>
      <ul className="material-list">
        {materials.map((material) => (
          <li key={material.id} className="material-item">
            <div className="material-card">
              <img
                src={`${Media_Url}${material.image}`}
                alt={material.title}
                className="material-image"
              />
              <div className="material-content">
                <h2 className="material-title">
                  <Link onClick={() => handleMaterialClick(material.id)} className="material-link">
                    {material.title}
                  </Link>
                </h2>
                <p className="material-description">Created at: {material.created_at}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
