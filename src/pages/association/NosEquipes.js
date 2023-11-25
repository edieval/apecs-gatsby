import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import "./NosEquipes.scss";
import BannerTeam from "../../images/team-banner-XL.png";

function replaceWPCssTeam(WPContent) {
  return WPContent.replaceAll("wp-block-columns", "columns")
    .replaceAll("wp-block-column", "column")
    .replaceAll("wp-block-image", "imgTeam")
    .replaceAll("<p", '<p class="pTeam"')
    .replaceAll("<h3", '<h3 class="titleTeam3"')
    .replaceAll("<h2", '<h2 class="titleTeam2"')
    .replaceAll("<h1", '<h1 class="titleTeam1"')
    .replaceAll("has-text-align-center", "has-text-centered content my-2")
    .replaceAll("has-text-align-left", "has-text-left content my-2")
    .replaceAll("has-text-align-right", "has-text-right content my-2")
    .replaceAll(
      "wp-block-button__link has-background wp-element-button",
      "button is-rounded is-medium is-responsive"
    )
    .replaceAll("wp-block-button", "block my-4");
}

function WPcontentTeam(props) {
  return <div>{parse(replaceWPCssTeam(props.content))}</div>;
}

export default function NosEquipes() {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query NosEquipesPostQuery {
      allWpPost(
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "equipes" } } } }
        }
      ) {
        edges {
          node {
            id
            title
            content
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 100
                      placeholder: DOMINANT_COLOR
                      layout: FULL_WIDTH
                    )
                  }
                }
              }
            }
            date(formatString: "DD/MM/YYYY")
          }
        }
      }
    }
  `);

  return (
    <div>
      <div className="banner">
        <img src={BannerTeam} alt="Team-banner" />
        <div className="banner-content">
          <h1>Nos Equipes</h1>
        </div>
      </div>
      <p className="pDefault">
        {" "}
        Notre association est constituée de nombreux membres aux status et aux
        fonctions différentes. Chacun à son échelle contribue à la bonne
        réalisation des projets et des missions de l'APECS. <br /> Le coeur de
        l'association, ce sont nos salariés. Forts de leurs compétences et de
        leurs expertises, ils ont en charge la mise en œuvre des projets. Ils
        travaillent dans nos locaux et sont heureux de vous y acceuillir. Ils
        sont régulièrement épaulés par nos volontaires en service civique et nos
        stagiaires qui viennent découvrir le monde associatif, la préservation
        et l'étude des élasmobranches.
        <br /> Notre association est gérée par un Conseil d’Administration
        composé uniquement de bénévoles. Chaque année, lors de l'Assemblée
        Générale Ordinaire, l'ensemble des adhérents participent à l'élection de
        ce conseil. Le conseil d'administration 2023/2024 se compose de 10
        membres aux profils très variés. Un bureau composé d'un président, d'une
        trésorière et d'un secrétaire a été élu par le conseil après l'assemblée
        générale 2023. <br /> <br />
      </p>
      <div className="container">
        <div className="columns is-mobile has-text-centered mb-6">
          <div className="columns">
            <h2 className="titleBannerLeft">{posts[0].node.title}</h2>
          </div>
        </div>
        <WPcontentTeam content={posts[0].node.content}></WPcontentTeam>
      </div>
    </div>
  );
}
