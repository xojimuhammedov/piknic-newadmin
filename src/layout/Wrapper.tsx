import { childrenType } from '@/interFace/interFace';
import React from 'react';

const Wrapper = ({ children }:childrenType) => {
    return (
        <>
            {children}
        </>
    );
};

export default Wrapper;