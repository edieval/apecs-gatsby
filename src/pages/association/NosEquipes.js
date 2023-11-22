import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import parse from "html-react-parser";
import replaceWPCss from "../../utils/ReplaceWPCss";

function WPcontentTeam(props) {
  return <div>{parse(replaceWPCss(props.content))}</div>;
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
    </div>
  );
}
