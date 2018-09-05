import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Flipped } from 'react-flip-toolkit';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { GUTTER, FONT_SIZE } from '../utils/constants';
import { Article } from '../utils/types';

const Post = ({
  data: {
    contentfulArticle: {
      slug,
      image,
      title,
      body: { body },
    },
  },
}) => (
  <PageWrapper>
    <Location>{({ location }) => console.log({ location }) || null}</Location>
    <Card>
      {image && (
        <Flipped flipId={slug}>
          <div>
            <Img
              sizes={image.sizes}
              alt={image.description}
              css={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </Flipped>
      )}
      <div css={{ padding: GUTTER.LG }}>
        <div css={{ paddingBottom: GUTTER.LG, fontSize: FONT_SIZE.XL }}>
          {title}
        </div>
        <div>{body}</div>
      </div>
    </Card>
  </PageWrapper>
);

Post.propTypes = {
  data: PropTypes.shape({ contentfulArticle: Article }).isRequired,
};

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      id
      slug
      title
      description
      body {
        body
      }
      publishedDate
      image {
        description
        sizes {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`;

export default Post;
