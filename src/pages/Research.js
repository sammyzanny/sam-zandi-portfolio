import React, { useState } from 'react';

function Example(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{props.name} clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

