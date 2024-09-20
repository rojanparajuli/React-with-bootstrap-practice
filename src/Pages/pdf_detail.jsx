import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Media_Url from '../../mediaUrl';

const DetailPage = () => {
  const { id } = useParams(); 
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterialDetail = async () => {
      try {
        const response = await axios.get(`http://192.168.0.148:8001/api/pdf/detail/${id}/`);
        setMaterial(response.data.pdf); 
      } catch (err) {
        setError('Error fetching material details');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!material) {
    return <div>No material found</div>;
  }

  return (
    <div className="detail-page-container">
      <h1 className="detail-page-title">{material.title}</h1>
      <iframe
        src={`${Media_Url}${material.pdf}`}
        title={material.title}
        width="100%"
        height="600px"
        frameBorder="0"
      />
      <p className="detail-page-created-at">Created at: {material.created_at}</p>
    </div>
  );
};

export default DetailPage;
