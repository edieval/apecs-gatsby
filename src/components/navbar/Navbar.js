import React, { useState } from "react";
import logo from "../../images/APECS-logo-header.png";
import "./navbar.scss";
import slugify from "../../utils/Slugify";
import { graphql, Link, useStaticQuery } from "gatsby";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query ActionTitlesPostQuery {
      allWpPost(
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "actions" } } } }
        }
      ) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  return (
    <nav
      className="navbar is-default-font is-fixed-top near-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand mobile-reordered">
        <Link className="navbar-item navbar-item-logo" to="/">
          <img
            src={logo}
            width={200}
            height={75}
            alt="A.P.E.C.S"
            className="block-transformation nav-logo"
          />
        </Link>

        <span
          onClick={() => {
            setIsActive(!isActive);
          }}
          tabIndex="0"
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="mainNavbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>

        <span className="is-flex-touch is-hidden-desktop">&nbsp;</span>
      </div>

      <div
        id="mainNavbar"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
        onClick={() => {
          setIsActive(!isActive);
          const el = document.activeElement;
          el?.blur();
        }}
        role="button"
      >
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link
              className="navbar-link is-arrowless is-spaced"
              to="/association/Association"
            >
              L'ASSOCIATION
            </Link>

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
            <Link
              to="/actions/Actions"
              className="navbar-link is-arrowless is-spaced"
            >
              NOS ACTIONS
            </Link>

            <div className="navbar-dropdown is-hidden-touch">
              {posts.map((action, index) => (
                <Link
                  className="navbar-item"
                  to={`/actions/${slugify(action.node.title)}`}
                  key={index}
                >
                  {action.node.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link is-arrowless" to="/act/Agir">
              AGIR À NOS CÔTÉS
            </Link>

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
            <Link to="/support/Support" className="navbar-link is-arrowless">
              NOUS SOUTENIR
            </Link>

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
            <Link to="/inform/Inform" className="navbar-link is-arrowless">
              S'INFORMER
            </Link>

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
                ADHÉRER
              </Link>
              <Link
                className="button block-transformation"
                to="/support/gift/Gift"
              >
                FAIRE UN DON
              </Link>
              <a
                className="button block-transformation bordered"
                href="https://sondages.asso-apecs.org/index.php/668917?lang=fr"
                target="_blank"
                rel="noreferrer"
              >
                SIGNALER UNE OBSERVATION
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
