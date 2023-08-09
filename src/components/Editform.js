import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editform = () => {
    const { index } = useParams();
    const history = useNavigate();
    const [localData, setLocalData] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData')) || [];
        setLocalData(storedData);
        setFormData({ ...storedData[index] });
    }, [index]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleUpdate = () => {
        const updatedLocalData = [...localData];
        updatedLocalData[index] = formData;
        localStorage.setItem('userData', JSON.stringify(updatedLocalData));
        alert("successfully updated");
        history("/view1");

    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData((prevData) => ({
                    ...prevData,
                    profilePic: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Name:</label>
                            <input
                                type='text'
                                name='name'
                                value={formData?.name || ""}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                        </div>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className='form-control'
                                value={formData?.phoneNumber || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Email:</label>
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                value={formData?.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        {formData.profilePic && (
                            <div>
                                <img
                                    src={formData.profilePic}
                                    alt='Profile Pic'
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label className='bmd-label-floating'>Profile Pic:</label>
                            <input
                                type="file"
                                name="profilePic"
                                className='form-control'
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className='bmd-label-floating'>Date of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className='form-control mb-6'
                                value={formData?.dateOfBirth || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-success btn-raised">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editform;
