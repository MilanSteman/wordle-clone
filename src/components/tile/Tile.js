import React from 'react';

export default function Tile({ letter }) {
  if (letter) {
    return <div className="filled">{letter}</div>;
  }

  return <div />;
}
