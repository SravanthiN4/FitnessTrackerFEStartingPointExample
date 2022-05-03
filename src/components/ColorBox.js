import React from 'react';

const ColorBox = (props) => {
    const { boxColor } = props;

    return (
        <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: boxColor,
        }}>

        </div>
    );
};

export default ColorBox;