import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faGift } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "gatsby";

const Layout = ({ children }) => {
  return (
    <main>
      <div id="top-bandeau" className="level mb-0 background-colored">
        <div className="level-left"></div>

        <div className="level-right">
          <p className="level-item">
            <Link className="top-bandeau-link" to="/support/shop/Shop">
              <FontAwesomeIcon icon={faGift} color="white" size="2x" />
              &nbsp;
              <span className="is-hidden-touch">Boutique</span>
            </Link>
          </p>
          <p className="level-item mr-2">
            <Link className="top-bandeau-link" to="/association/Contact">
              <FontAwesomeIcon icon={faMobileAlt} color="white" size="2x" />
              &nbsp;
              <span className="is-hidden-touch">Contact</span>
            </Link>
          </p>
        </div>
      </div>
      <Navbar />
      {children}
      <Footer />
      <a href="#top" className="button is-floating is-small is-rounded">
        <i className="fas fa-chevron-up"></i>
      </a>
    </main>
  );
};
export default Layout;