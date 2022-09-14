import React from 'react';
import Hyperlink from './Hyperlink';

function Hyperlinks(props) {
  return (
    <div className="hyperlinks">
      {props.hyperlinks.map((hyperlink) => {
        return (
          <Hyperlink
            href={hyperlink.href}
            innerHTML={hyperlink.innerHTML}
          />  
        )
      })}
    </div>
  )
}

export default Hyperlinks;