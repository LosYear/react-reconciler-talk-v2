import React, { useState, useCallback } from 'react';

const Controls = React.memo<{
    appendChild: React.MouseEventHandler;
    insertChildBefore: React.MouseEventHandler;
}>(({ appendChild, insertChildBefore }) => (
    <div className="controls">
        <button onClick={appendChild}>Вставить в конец</button>
        <button onClick={insertChildBefore}>Вставить в начало</button>
    </div>
));

const InsertExample: React.FC = () => {
    const [items, setItems] = useState([1]);

    const appendChild = useCallback(
        () => setItems((prevItems) => [...prevItems, prevItems.length + 1]),
        []
    );

    const insertChildBefore = useCallback(
        () => setItems((prevItems) => [prevItems.length + 1, ...prevItems]),
        []
    );

    return (
        <>
            <Controls
                appendChild={appendChild}
                insertChildBefore={insertChildBefore}
            />

            <div className="grid">
                {items.map((item) => (
                    <img src={`/public/${item}.png`} key={item} />
                ))}
            </div>
        </>
    );
};

export default InsertExample;
