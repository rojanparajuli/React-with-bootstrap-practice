import React from 'react';
import { Link } from 'react-router-dom';

const materials = [
  {
    id: 1,
    title: 'DIgital Logic',
    description: 'BCA 1st Semester',
    imageUrl: 'src/assets/image/social-share-img-02.jpg',
  },
  {
    id: 2,
    title: 'English 1',
    description: 'BCA 1st Semester',
    imageUrl: 'src/assets/image/english.jpg',
  },
  {
    id: 3,
    title: 'Math 1',
    description: 'BCA 1st Semester',
    imageUrl: 'src/assets/image/acc97c4f6ba2fc68266b7e687511abca.jpg',
  },
  {
    id: 3,
    title: 'Socialogy',
    description: 'BCA 1st Semester',
    imageUrl: 'src/assets/image/maxresdefault.jpg',
  },
  {
    id: 3,
    title: 'Computer',
    description: 'BCA 1st Semester',
    imageUrl: 'src/assets/image/Computer-Science-–-A-Level-Hero.jpg',
  },
];

const MaterialList = () => {
  return (
    <div className="material-list-container">
      <h1 className="material-list-title">Study Materials</h1>
      <ul className="material-list">
        {materials.map((material) => (
          <li key={material.id} className="material-item">
            <div className="material-card">
              <img
                src={material.imageUrl}
                alt={material.title}
                className="material-image"
              />
              <div className="material-content">
                <h2 className="material-title">
                  <Link to={`/material/${material.id}`} className="material-link">
                    {material.title}
                  </Link>
                </h2>
                <p className="material-description">{material.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
