import React, { useState } from 'react';

function L() {
    const [first, setFirst] = useState(0);

    function handleClick2() {
        setFirst(first + 10);
        console.log(first + 10); // Log the updated value
    }

    return (
        <div>
            <button onClick={handleClick2}>
                Click 1
            </button>
            <button onClick={handleClick2} style={{ height: first.toString() + "px", width: first.toString() + "px" }}>
                Click 2
            </button>
        </div>
    );
}

export default L;
