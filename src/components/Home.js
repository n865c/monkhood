import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from "../firebase";
import { isEmpty } from "lodash"

const Home = () => {
    const initialFormState = {
        name: '',
        phoneNumber: '',
        email: '',
        profilePic: "",
        dateOfBirth: '',
    };

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState(initialFormState);
    const { name, phoneNumber, email, profilePic, dateOfBirth } = formdata;



    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEmpty(id)) {
            const newData = { ...formdata, id: Date.now() };

            // Save data to Firebase
            database.ref("details").push(newData, (err) => {
                if (err) {
                    console.log(err);
                }
                alert("Form submitted successfully");
            });

            // Save data to local storage
            const localData = JSON.parse(localStorage.getItem('userData')) || [];
            const existingDataIndex = localData.findIndex(item => item.id === newData.id);
            if (existingDataIndex !== -1) {
                localData[existingDataIndex] = newData;
            } else {
                localData.push(newData);
            }
            localStorage.setItem('userData', JSON.stringify(localData));
        } else {
            database.ref(`details/${id}`).set(formdata, (err) => {
                if (err) {
                    console.log(err);
                }
                alert("Successfully updated");
            });
        }
        setFormdata(initialFormState);
    };

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormdata({ ...formdata, [name]: reader.result });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setFormdata({ ...formdata, [name]: value });
        }
    };

    let currentId = useParams();
    const { id } = currentId;

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('userData')) || [];
        setData(localData.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}));

        const fetchData = () => {
            database.ref("details").on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    setData(snapshot.val());
                } else {
                    setData({});
                }
            });
        };

        fetchData();

        return () => {
            database.ref("details").off("value", fetchData);
        };
    }, [id]);


    useEffect(() => {
        if (isEmpty(id)) {
            setFormdata({
                ...initialFormState
            });
        } else {
            setFormdata({ ...data[id] });
        }
    }, [id, data]);

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Name:</label>
                            <input
                                type="text"
                                name="name"
                                className='form-control'
                                value={name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className='form-control'
                                value={phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Email:</label>
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <img src={profilePic} style={{
                                width: "40px"
                            }} />
                        </div>
                        <div className="form-group">
                            <label className='bmd-label-floating'>Profile Pic:</label>
                            <input
                                type="file"
                                name="profilePic"
                                className='form-control'
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className='bmd-label-floating'>Date of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className='form-control mb-6'
                                value={dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-success btn-raised">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
