import React, { useEffect, useState } from 'react'
import ProfileCardStack from '../Components/ProfileCardStack';
import { serviceGetCandidate } from '../services/interactions';

function People() {

    return (
        <div className='App'>
            {/* Traversing through cards array using map function
      and populating card with different image and color */}
            <ProfileCardStack />

        </div>
    );
}

export default People