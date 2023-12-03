import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "gatsby";
import "./index.scss";

const Layout = ({ children }) => {
  return (
    <main>
      <section className="section p-0 is-fixed-top">
        <div
          id="top-bandeau"
          className="level is-mobile mb-0 background-colored is-size-7-mobile is-fixed-top"
        >
          <div className="level-left"></div>

          <div className="level-right">
            <p className="level-item">
              <a
                className="top-bandeau-link"
                href="https://www.boutique.asso-apecs.org/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faBagShopping} color="white" size="2x" />
                &nbsp;
                <span className="is-hidden-touch">Boutique</span>
              </a>
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
      </section>
      {children}
      <Footer />
      <a href="#top" className="button is-floating is-small is-rounded">
        <i className="fas fa-chevron-up"></i>
      </a>
    </main>
  );
};
export default Layout;
