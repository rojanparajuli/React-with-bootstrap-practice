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
    const [editMode, setEditMode] = useState(false); // State to toggle the modal
    const [editedProfile, setEditedProfile] = useState({
        address: '',
        dob: '',
        about: ''
    }); // State to hold edited profile info

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
        setEditMode(true); // Show the modal
    };

    const handleCloseModal = () => {
        setEditMode(false); // Close the modal
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
            setEditMode(false); // Close the modal after update
        } catch (error) {
            setError('Error updating profile data');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            {profile && (
                <div className="cards-container">
                    {/* Profile Card (Image and Name) */}
                    <div className="profile-card">
                        <div className="profile-image-container">
                            <img src={`${Media_Url}${profile.image}`} alt="Profile" className="profile-image" />
                            {/* Upload Icon as Overlay */}
                            <div className="upload-icon">
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </div>
                        <h1 className="profile-name">{profile?.full_name}</h1>
                    </div>

                    {/* Info Card (Additional Information) */}
                    <div className="info-card">
                        {/* Edit Icon in the top-right corner */}
                        <div className="edit-icon" onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                        <p className="profile-info">Email: {profile?.email}</p>
                        <p className="profile-info">Address: {profile?.address}</p>
                        <p className="profile-info">Date of Birth: {profile?.dob}</p>
                        <p className="profile-info">About: {profile?.about}</p>
                        <div className="social-links">
                            {/* Social Media Links */}
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

                    {/* Modal Dialog for Editing Profile */}
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
