import React from 'react';
import useMutation from './useMutation';
import UIContext from '../store/ui-context';

const useUI = () => {
    const context = React.useContext(UIContext);
    if(!context) {
        throw new Error('Context must be used with in a UI provider');
    }

    return context;
}

export default useUI;

