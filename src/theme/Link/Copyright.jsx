import React from 'react';
import ThemedImage from '@theme/ThemedImage';

function Copyright() {
  return (
    <div className="copyright col">
      <a href='https://www.terra.money/'>
        <ThemedImage
          sources={{
            light:"/img/icons/terraform-labs.svg",
            dark:"/img/Luna-color.svg"}}
            height="40px"
        />
      </a>
      <p style={{fontSize: '10px'}}>{`Copyright © ${new Date().getFullYear()} Terraform Labs`}</p>
    </div>
  )
}

export default Copyright;