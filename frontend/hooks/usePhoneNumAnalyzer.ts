import {useState, useEffect} from 'react';

import { filteredNumbers } from '../utils';

const usePhoneNumAnalyzer = (phoneNumbers: string) => {
    const [validNumbers, setValidNumbers] = useState<Array<string>>([]);
    const [invalidNumbers, setInvalidNumbers] = useState<Array<string>>([]);
    
    useEffect(() => {
        const {invalidNum, validNum} = filteredNumbers(phoneNumbers);
        setInvalidNumbers(invalidNum);
        setValidNumbers(validNum);
        console.log(JSON.stringify({valid: validNum, invalid: invalidNum}));
    }, [phoneNumbers]);

    return {
        validNumbers,
        invalidNumbers,
        isValidActive: validNumbers.length > 0,
        isInValidActive: invalidNumbers.length > 0,
        recipients: validNumbers.length,
    }
}

export default usePhoneNumAnalyzer;
