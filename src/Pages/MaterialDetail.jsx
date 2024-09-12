import React from 'react';
import { useParams, Link } from 'react-router-dom';

const materials = [
  { id: 1, title: 'Material 1', description: 'Detailed description for Material 1' },
  { id: 2, title: 'Material 2', description: 'Detailed description for Material 2' },
  { id: 3, title: 'Material 3', description: 'Detailed description for Material 3' },
];

const MaterialDetail = () => {
  const { id } = useParams();
  const material = materials.find((mat) => mat.id === parseInt(id, 10));

  if (!material) {
    return <div>Material not found</div>;
  }

  return (
    <div>
      <h1>{material.title}</h1>
      <p>{material.description}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default MaterialDetail;
