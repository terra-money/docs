import React from 'react';
import SocialLink from './SocialLink';

function SocialLinks(props) {
  return (
    <div className="social-links">
      {props.socialLinks.map((socialLink) => {
        return (
          <SocialLink
            href={socialLink.href}
            alt={socialLink.alt}
            lightSvg={socialLink.lightSvg}
            darkSvg={socialLink.darkSvg}
          />  
        )
      })}
    </div>
  )
}

export default SocialLinks;
