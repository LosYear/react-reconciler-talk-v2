import React, { useState, useCallback } from 'react';

const Item: React.FC<{ image: string }> = ({ image }) => {
    const [gray, setGray] = useState(false);

    const toggleGray = useCallback(
        () => setGray((prevState) => !prevState),
        []
    );

    return (
        <img
            src={`/public/${image}.png`}
            className={gray ? 'grayscale' : undefined}
            onClick={toggleGray}
        />
    );
};

const PropChangeExample: React.FC = () => (
    <div className="grid">
        <Item image="1" />
        <Item image="2" />
        <Item image="3" />
    </div>
);

export default PropChangeExample;
