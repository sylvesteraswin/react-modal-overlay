import React from 'react';
import Logo from '../../components/logo';

const LogoTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Logo</h5>

    <div
      className="mv2">
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/images.png" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/css3logo.png" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/logo_JavaScript.png" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/react-logo.png" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/12612655.png" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/nodejs.gif" />
      <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/webpack.png" />
    </div>

    <div
      className="mt3">
      <small>All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.</small>
    </div>
  </section>
);

export default LogoTest;
