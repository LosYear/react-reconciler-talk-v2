import React, { useState, useCallback } from 'react';

const Controls = React.memo<{ removeFirstChild: React.MouseEventHandler }>(
    ({ removeFirstChild }) => (
        <div className="controls">
            <button onClick={removeFirstChild}>Удалить первый</button>
        </div>
    )
);

const RemoveExample: React.FC = () => {
    const [items, setItems] = useState([1, 2]);

    const removeFirstChild = useCallback(
        () => setItems((prevItems) => [...prevItems.slice(1)]),
        []
    );

    return (
        <>
            <Controls removeFirstChild={removeFirstChild} />
            <div className="grid">
                {items.map((item) => (
                    <img src={`/public/${item}.png`} key={item} />
                ))}
            </div>
        </>
    );
};

export default RemoveExample;
