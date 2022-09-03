import React from 'react';
import SocialLinks from '../Link/SocialLinks';
import socialLinks from '../Link/link-data/social-links';
import Hyperlinks from '../Link/Hyperlinks';
import hyperlinks from '../Link/link-data/hyperlinks';
import Copyright from '../Link/Copyright';


function Footer() {
  return (
    <footer>
      <div className="links">
        <SocialLinks socialLinks={socialLinks} />
        <Copyright />
        <Hyperlinks hyperlinks={hyperlinks} />
      </div>
    </footer>
  );
}
export default React.memo(Footer);
