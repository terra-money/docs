import React from 'react';

function Copyright() {
  return (
    <div className="copyright">
      <a href='https://www.terra.money/'>
        <img src='/img/icons/terraform-labs.svg' alt='Terraform Labs' />
      </a>
      <p style={{fontSize: '10px'}}>{`Copyright © ${new Date().getFullYear()} Terraform Labs`}</p>
    </div>
  )
}

export default Copyright;