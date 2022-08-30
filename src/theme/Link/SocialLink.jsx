import React from 'react';
import ThemedImage from '@theme/ThemedImage';

function SocialLink(props) {
  return (
    <a className='social-link' href={props.href}>
      <ThemedImage
        className='social-image'
        alt={props.alt}
        sources={{
          light: props.lightSvg,
          dark: props.darkSvg,
        }}
      />
    </a>
  )
}

export default SocialLink;
