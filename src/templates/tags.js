import React from 'react';
import PropTypes from 'prop-types';

import { Link, graphql } from 'gatsby';

const Tags = ({ pageContext, data }) => {
	const { tag } = pageContext;
	const { edges, totalCount } = data.allMarkdownRemarks;

	const tagHeader = ( totalCount === 1 )? `${ totalCount } post` : `${ totalCount } posts`;

	return (
		<div>
			<h1>{ tagHeader }</h1>
			<ul>
				{
					edges.map( ({ node }) => {
						const { path, title } = node.frontmatter;

						return (
							<li key={ path }>
								<Link to={ path }>{ title }</Link>
							</li>
						);
					} )
				}
			</ul>
			<Link to="/tags">All tags</Link>
		</div>
	);

};

Tags.propTypes = {
	pathContext: PropTypes.shape({
		tag: PropTypes.string.isRequired
	}),
	data: PropTypes.shape({
		allMarkdownRemarks: PropTypes.shape({
			totalCount: PropTypes.number.isRequired,
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						frontmatter: PropTypes.shape({
							path: PropTypes.string.isRequired,
							title: PropTypes.string.isRequired
						})
					})
				}).isRequired
			)
		})
	})
}

export default Tags;

export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemarks(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					frontmatter {
						title
						path
					}
				}
			}
		}
	}
`