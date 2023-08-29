import React from 'react';

type UsernameProps = {
    name: string;
  }

function Username(props : UsernameProps) {
  return (
    <div>
      <h1 className="flex flex-col font-bold absolute right-6 top-6">
        <span className="text-gray-500 text-xl">Welcome,</span>
        <span className="text-2xl text-white">{props.name}</span>
      </h1>
    </div>
  );
}

export default Username;