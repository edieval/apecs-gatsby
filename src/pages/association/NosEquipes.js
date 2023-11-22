import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import "./NosEquipes.scss";

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
      <div className="container">
        <div className="columns is-mobile has-text-centered mb-6">
          <div className="columns">
            <h2 className="titleBannerLeft">{posts[0].node.title}</h2>
          </div>
        </div>
        <WPcontentTeam content={posts[0].node.content}></WPcontentTeam>
      </div>
      <div></div>
    </div>
  );
}
