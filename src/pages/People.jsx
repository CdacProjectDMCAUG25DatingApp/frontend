import React from 'react'
import ProfileCardComponent from '../Components/ProfileCardComponent'
import ProfileCardStack from '../Components/ProfileCardStack';

function People() {
    
    return (
        <div className='App'>
            {/* Traversing through cards array using map function
      and populating card with different image and color */}
            <ProfileCardStack/>
            
        </div>
    );
}

export default People