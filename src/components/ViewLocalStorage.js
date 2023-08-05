import React, { useEffect, useState } from 'react';
import { database } from "../firebase";
import { Link } from 'react-router-dom';

const ViewLocalStorage = () => {
    const [data, setData] = useState({});
    const [localData, setLocalData] = useState([]);

    // Fetch data from Firebase
    useEffect(() => {
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
    }, []);

    // Fetch data from LocalStorage
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
                       
                        <tbody>
                           
                            {Object.keys(data).map((id, index) => {
                                return (
                                    <tr key={id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].phoneNumber}</td>
                                        <td>{data[id].email}</td>
                                        <td>

                                            {data[id].profilePic && (
                                                <img
                                                    src={data[id].profilePic}
                                                    alt='Profile Pic'
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            )}
                                        </td>
                                        <td>{data[id].dateOfBirth}</td>
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
