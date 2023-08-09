import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewLocalStorage = () => {
    const [localData, setLocalData] = useState([]);
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('userData')) || [];
        setLocalData(localData);
    }, []);
    const onDeleteLocal = (index) => {
        if (window.confirm("Are you sure you want to delete this record from LocalStorage?")) {
            const updatedLocalData = [...localData];
            updatedLocalData.splice(index, 1);
            setLocalData(updatedLocalData);
            localStorage.setItem('userData', JSON.stringify(updatedLocalData));
        }
    }
    return (
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='jumbotron'>
                        <h2 className='display-2'>View form in LocalStorage</h2>
                    </div>
                    <table className='table table-bordered table-striped' >
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>No</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Phone number</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Profile pic</th>
                                <th scope='col'>Date of birth</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {Object.keys(localData).map((id, index) => {
                                return (
                                    <tr key={id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{localData[id].name}</td>
                                        <td>{localData[id].phoneNumber}</td>
                                        <td>{localData[id].email}</td>
                                        <td>

                                            {localData[id].profilePic && (
                                                <img
                                                    src={localData[id].profilePic}
                                                    alt='Profile Pic'
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            )}
                                        </td>
                                        <td>{localData[id].dateOfBirth}</td>
                                        <td>
                                            <Link to={`/updatefromLocal/${index}`}>
                                                <a className='btn text-primary'>
                                                    <span className="fas fa-pencil-alt"></span>
                                                </a>
                                            </Link>
                                            <a className='btn text-danger' onClick={() => onDeleteLocal(index)}>
                                                <i className='fas fa-trash-alt'></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewLocalStorage;
