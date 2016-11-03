import React from 'react';
import Logo from '../../components/logo';

const LogoTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Logo</h5>

    <div
      className="mv2">
      <div className="cf">
        <div className="fl w-100 w-20-ns tc pv5">
          <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/HTML5_logo_and_wordmark.svg.png" />
        </div>
        <div className="fl w-25 w-20-ns tc pv5">
          <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/css3logo.png" />
        </div>
        <div className="fl w-25 w-20-ns tc pv5">
          <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/logo_JavaScript.png" />
        </div>
        <div className="fl w-25 w-20-ns tc pv5">
          <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/logo_JavaScript.png" />
        </div>
        <div className="fl w-25 w-20-ns tc pv5">
          <Logo src="https://dl.dropboxusercontent.com/u/8725581/FE_logos/nodejs.gif" />
        </div>
      </div>
    </div>

    <div
      className="mt3">
      <small>All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.</small>
    </div>
  </section>
);

export default LogoTest;
