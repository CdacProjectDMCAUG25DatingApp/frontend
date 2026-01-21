import React, { useEffect, useState } from 'react'
import ProfileCardStack from '../Components/ProfileCardStack';
import { serviceGetCandidate } from '../services/interactions';

function People() {

    return (<div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div
            className="text-white rounded-4 "
            style={{
                width: "300px",
                height: "500px"
            }}
        >
            <ProfileCardStack />
        </div>
    </div >
    );
}

export default People