import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

function NewsCard(props) {
  const featuredImage = {
    fluid: props.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: props.featuredImage?.node?.alt || ``,
  };
  return (
    <div className="card block-transformation">
      <div className="card-image">
        {featuredImage?.fluid && (
          <GatsbyImage
            image={featuredImage.gatsbyImageData}
            alt={featuredImage.alt}
            className="image is-4by3" />
        )}
      </div>
      <div className="card-content">
        <p className="title is-size-5 is-centered">{props.title}</p>
        <p className="subtitle is-size-6">
          <time dateTime={props.date}>{props.date}</time>
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
