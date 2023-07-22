import React, { useState } from 'react'
import { MaterialInput, MaterialButton } from '../Input/index'
import axios from './axios';
function ResetPassword() {
    const [newPass, setNewPass] = useState();
    const [confirmNewPass, setConfirmNewPass] = useState();
    const password = async (resetLink, newPass) => {
        const res = await axios.put(`/reset-password`, {
            resetLink, newPass
        })
        if (res.status === 200) {
            alert('Password changed Successfully');
            window.opener = null;
            window.open('', '_self');
            window.close();
        } else {
            if (res.status === 400) {
                console.log('error');
            }
        }
    }
    const ChangePassword = () => {
        if (newPass === confirmNewPass) {
            const location = window.location.pathname;
            const resetLink = location.split('/')[2];
            password(resetLink, newPass);
        }
        else {
            setNewPass('');
            setConfirmNewPass('');
            alert('Password didnot match');
        }
    }
    return (
        <div className='resetPassword'>

            <MaterialInput
                type="password"
                label="Enter New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
            />
            <MaterialInput
                type="password"
                label="Confirm Password"
                value={confirmNewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
            />

            <MaterialButton
                title="Confirm"
                bgColor="black"
                textColor="white"
                style={{
                    margin: '15px 0 10px 0',
                    width: '530px'
                }}
                onClick={ChangePassword}
            />
        </div>
    )
}

export default ResetPassword