import React from 'react';
import ThemedImage from '@theme/ThemedImage';

function Card(props) {
  return (
    <a href={props.href}>
      <ThemedImage sources={{
        light: props.lightSvg,
        dark: props.darkSvg
      }} />
      <div className="text-container">
        <h2>{props.header}</h2>
        <p>{props.summary}</p>
      </div>
    </a>
  )
}

export default Card;
