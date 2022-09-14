import React from 'react';

function Hyperlink(props) {
  return (
    <a className='hyperlink' href={props.href}>
      {props.innerHTML}
    </a>
  )
}

export default Hyperlink;
