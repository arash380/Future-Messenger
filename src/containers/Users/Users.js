import React, {useEffect, useState} from 'react';
import classes from './Users.module.css';
import User from './User/User';
import db from '../../firebase/firebase';

const Users = (props) => {
    const [users, setUsers] = useState();

    useEffect(() => {
        db.collection('users').orderBy('name', 'asc').onSnapshot(snap => {
            setUsers(snap.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                photo: doc.data().photo
            })))
        })
    }, [])

    let userInfo = null;
    if (users) {
        userInfo = users.map((user) => (
            <User
                key={user.id}
                id={user.id}
                name={user.name}
                photo={user.photo}
                closeModal={props.closeModal}/>
        ))
    }

    return (
        <div className={classes.Users}>
            <h1>Select a user</h1>
            {userInfo}
        </div>
    );
}

export default Users;