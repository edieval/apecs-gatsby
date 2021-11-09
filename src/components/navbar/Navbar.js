import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./navbar.scss";
import { Link } from "gatsby";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-fixed-top is-default-font"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src={logo}
            height={150}
            width={131}
            alt="A.P.E.C.S"
            className="block-transformation nav-logo"
          />{" "}
          <div className="ml-4 title has-text-light has-text-weight-medium is-hidden-desktop">
            A.P.E.C.S
          </div>
        </Link>

        <Link
          onClick={() => {
            setIsActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="mainNavbar"
          to="#top"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div
        id="mainNavbar"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#top" className="navbar-link is-arrowless is-spaced">
              L'ASSOCIATION
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/association/Missions">
                Nos missions
              </Link>
              <Link className="navbar-item" to="/association/NosEquipes">
                Nos équipes
              </Link>
              <Link className="navbar-item" to="/association/Contact">
                Contact
              </Link>
              <Link className="navbar-item" to="/association/Press">
                Contact presse
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#top" className="navbar-link is-arrowless is-spaced">
              NOS ACTIONS
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/actions/Actions">
                Nos actions
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#top" className="navbar-link is-arrowless">
              AGIR À NOS CÔTÉS
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/act/Benevole">
                Devenir bénévole
              </Link>
              <Link className="navbar-item" to="/act/Sciences">
                Les sciences participatives
              </Link>
              <Link className="navbar-item" to="/act/Pecheurs">
                Pêcheurs responsables
              </Link>
              <Link className="navbar-item" to="/act/Engagez">
                Engagez-vous
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#top" className="navbar-link is-arrowless">
              NOUS SOUTENIR
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/support/adhesion/Adhesion">
                Adhérer
              </Link>
              <Link className="navbar-item" to="/support/gift/Gift">
                Faire un don
              </Link>
              <Link
                className="navbar-item"
                to="/support/partnership/Partnership"
              >
                Devenir partenaire
              </Link>
              <Link className="navbar-item" to="/support/shop/Shop">
                Boutique
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#top" className="navbar-link is-arrowless">
              S'INFORMER
            </a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/inform/actualites/Actualites">
                À la une
              </Link>
              <Link
                className="navbar-item"
                to="/inform/elasmobranches/Elasmobranches"
              >
                Les élasmobranches
              </Link>
              <Link className="navbar-item" to="/inform/resources/resources">
                Ressources
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                  className="button block-transformation"
                  to="/support/adhesion/Adhesion"
              >
                <strong>ADHÉRER</strong>
              </Link>
              <Link
                className="button block-transformation"
                to="/support/gift/Gift"
              >
                <strong>FAIRE UN DON</strong>
              </Link>
              <Link
                className="button is-light block-transformation"
                to="/support/shop/Shop"
              >
                <strong>Boutique</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
