
// Counter component
import React, { useState } from 'react';    // import React and useState hook

export const Counter: React.FC<{ initialCount?: number }> = ({ initialCount = 0 }) => { // define Counter component with initialCount prop
    const [count, setCount] = useState(initialCount); // useState hook to manage count state

    const increment = () => setCount(count + 1); // function to increment count
    const decrement = () => setCount(count - 1); // function to decrement count

    return (
        <div>
            <h1>Count: {count}</h1> {/* display current count */}
            <button onClick={increment}>Increment</button> {/* button to increment count */}
            <button onClick={decrement}>Decrement</button> {/* button to decrement count */}
        </div>
    );
};