import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BannerMiss from "../../images/missions-fullHD.png";
import parse from "html-react-parser";
import replaceWPCss from "../../utils/ReplaceWPCss";
import "./Association.scss";

function WPcontentAsso(props) {
  return <div>{parse(replaceWPCss(props.content))}</div>;
}

export default function Association() {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query AssociationPostQuery {
      allWpPost(
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "association" } } } }
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
        <img src={BannerMiss} alt="Mission-banner" />
        <div className="banner-content">
          <h1>Missions</h1>
        </div>
      </div>
      <div className="container">
        <div className="container">
          <div className="columns is-mobile has-text-centered mb-6">
            <div className="columns">
              <h2 className="titleBannerLeft">{posts[0].node.title}</h2>
            </div>
          </div>
          <WPcontentAsso content={posts[0].node.content}></WPcontentAsso>
        </div>
      </div>
    </div>
  );
}
