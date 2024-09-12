import React from 'react';
import { Link } from 'react-router-dom';

const materials = [
  { id: 1, title: 'Material 1', description: 'Description for Material 1' },
  { id: 2, title: 'Material 2', description: 'Description for Material 2' },
  { id: 3, title: 'Material 3', description: 'Description for Material 3' },
];

const MaterialList = () => {
  return (
    <div>
      <h1>Study Materials</h1>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            <Link to={`/material/${material.id}`}>{material.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
