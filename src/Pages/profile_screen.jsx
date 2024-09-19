import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css_folder/profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(localStorage.getItem('token'))
    let token = localStorage.getItem('token')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://192.168.0.148:8001/api/profile/profile_detail/', {
                    headers: {
                        'token': token,
                    }
                });
                console.log(response)
                setProfile(response.data.profile);
                
                setProfile(response.data.profile);
            } catch (error) {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            {profile && (
                <div className="profile-card">
                    <img src={profile.image} alt="Profile" className="profile-image" />
                    <h1>{profile.full_name}</h1>
                    <p>Email: {profile.email}</p>
                    <p>Address: {profile.address}</p>
                    <p>Date of Birth: {profile.dob}</p>
                    <button className="edit-button">Edit Profile</button>
                    <button className="upload-button">Upload Profile Picture</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
