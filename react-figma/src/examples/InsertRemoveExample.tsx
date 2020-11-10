import React from 'react';

const InsertRemoveExample = () => {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setVisible((prev) => !prev);
        }, 700);
    });

    return (
        <frame height={134} width={100}>
            {visible && (
                <rectangle width={100} height={100} backgroundColor="#b8de6f" />
            )}
            <text y={110}>Hello, HolyJS</text>
        </frame>
    );
};

export default InsertRemoveExample;
