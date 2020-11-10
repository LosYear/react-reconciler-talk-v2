import React, { useState, useCallback } from 'react';

const TextUpdateExample: React.FC = () => {
    const [counter, setCounter] = useState(0);
    const incrementCounter = useCallback(
        () => setCounter((prev) => prev + 1),
        []
    );

    return (
        <div onClick={incrementCounter} className="text-update">
            {counter}
        </div>
    );
};

export default TextUpdateExample;
