import ProfileMain from '@/components/profile/ProfileMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const ProfilePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Profile'>
             <ProfileMain/>
            </ContentWrapper> 
        </>
    );
};

export default ProfilePage;