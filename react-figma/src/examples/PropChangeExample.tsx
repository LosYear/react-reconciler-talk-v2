import React from 'react';

const PropChangeExample = () => {
    const [color, setColor] = React.useState(0);
    const colors = ['#01c5c4', '#b8de6f', '#f1e189', '#f39233'];

    React.useEffect(() => {
        setTimeout(() => {
            setColor((prev) => prev + 1);
        }, 700);
    });

    return (
        <rectangle
            width={100}
            height={100}
            backgroundColor={colors[color % 4]}
        />
    );
};

export default PropChangeExample;
