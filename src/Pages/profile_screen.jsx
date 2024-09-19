import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css_folder/profile.css';
import BASE_URL from '../../baseURL';
import Media_Url from '../../mediaUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCamera } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        address: '',
        dob: '',
        about: ''
    });

    let token = localStorage.getItem('token');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(BASE_URL + 'profile/profile_detail/', {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            setProfile(response.data.profile);
            setEditedProfile({
                address: response.data.profile.address,
                dob: response.data.profile.dob,
                about: response.data.profile.about
            });
        } catch (error) {
            setError('Error fetching profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setEditMode(true); 
    };

    const handleCloseModal = () => {
        setEditMode(false); 
    };

    const handleInputChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(BASE_URL + 'profile/profile_update/', editedProfile, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            setProfile(response.data.profile);
            setEditMode(false); 
        } catch (error) {
            setError('Error updating profile data');
        }
    };

    if (loading) return <p className='text-center' style={{ marginTop: '50%' }}>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container row">
            {profile && (
                <div className="cards-container col-md-6">
                    {/* Profile Card (Image and Name) */}
                    <div className="profile-card">
                        <div className="profile-image-container">
                            <img src={`${Media_Url}${profile.image}`} alt="Profile" className="profile-image" />
                            {/* Upload Icon as Overlay */}
                            <div className="upload-icon">
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </div>
                        <div className="profile-name-container">
                            <h1 className="profile-name">{profile?.full_name}</h1>
                            {profile.is_verified && (
                                <div className="verified-icon">
                                    <img src="src/assets/image/verify-blue-tick-free-png-removebg-preview.png" alt="Verified" className="verified-image" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="info-card col-md-6">
                        <div className="edit-icon" onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                        <p className="profile-info">Email: {profile?.email}</p>
                        <p className="profile-info">Address: {profile?.address}</p>
                        <p className="profile-info">Date of Birth: {profile?.dob}</p>
                        <p className="profile-info">About: {profile?.about}</p>
                        <div className="social-links">
                            <a href={profile?.facebook} target="_blank" rel="noopener noreferrer">
                                <img src="src/assets/image/facebook.png" alt="Facebook" className="social-logo" />
                            </a>
                            <a href={profile?.insta} target="_blank" rel="noopener noreferrer">
                                <img src="src/assets/image/insta.png" alt="Instagram" className="social-logo" />
                            </a>
                            <a href={profile?.github} target="_blank" rel="noopener noreferrer">
                                <img src="src/assets/image/25231.png" alt="GitHub" className="social-logo" />
                            </a>
                            <a href={profile?.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src="src/assets/image/LinkedIn_logo_initials.png" alt="LinkedIn" className="social-logo" />
                            </a>
                        </div>
                    </div>

                    {editMode && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Edit Profile</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={editedProfile.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={editedProfile.dob}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>About</label>
                                        <textarea
                                            name="about"
                                            value={editedProfile.about}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="submit" className="save-btn">Save</button>
                                        <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
