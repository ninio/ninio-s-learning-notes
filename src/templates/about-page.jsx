import React from 'react';
import Content, { HTMLContent } from './../components/Content.jsx';

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
	const PageContent = contentComponent || Content;
	return (
		<div className="section section--gradient">
			<div className="container">
				<div className="columns">
					<div className="column is-10 is-offset-1">
						<div className="section">
							<h2 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h2>
							<PageContent className="content" content={content} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ({ data }) => {
	const { markdownRemark: post } = data;
	return <AboutPageTemplate
		contentComponent={HTMLContent}
		title={post.frontmatter.title}
		content={post.html}
	/>;
};

export const aboutPageQuery = graphql`
	query AboutPage($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`;
