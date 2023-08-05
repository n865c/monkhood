import React from 'react'
import { useEffect, useState } from 'react'
import { database } from "../firebase";
import { Link } from 'react-router-dom';
const ViewFirebase = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        // database.ref("details").on("value", (snapshot) => {
        //     if (snapshot.val() != null) {
        //         setData({
        //             ...snapshot.val(),
        //         });

        //     }
        //     else {
        //         snapshot({});
        //     }
        // });
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
    const onDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete this record?")) {
            database.ref(`details/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }
    return (
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='jumbotron'>
                        <h2 className='display-2'>View form in Firebase</h2>
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
                                            <Link to={`/update/${id}`}>
                                                <a className='btn text-primary'>
                                                    <span className="fas fa-pencil-alt"></span>
                                                </a>
                                            </Link>
                                            <a className='btn text-danger' onClick={() => onDelete(id)}>
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

export default ViewFirebase;
