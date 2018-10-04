import React from 'react';
import Content, { HTMLContent } from '../components/Content.jsx';
import Helmet from 'react-helmet';

export const BlogPostTemplate = ({ content, contentComponent, description, title, helmet, draft }) => {
	const PostContent = contentComponent || Content;

	const DraftNotice = draft? ( <span>This is a draft. Content will be changes!</span> ) : null;
					// <p>{description}</p>
	return <section className="section">
		{ helmet ? helmet : ""}
		<div className="container content">
			<div className="columns">
				<div className="column is-10 is-offset-1">
					<h1 className="title is-size-2 has-text-weight-bold is-bold-light">{ title }</h1>
					{ DraftNotice }
					<PostContent content={ content } />
				</div>
			</div>
		</div>
	</section>;
}

export default ({ data }) => {
	const { markdownRemark: post } = data;
	return <BlogPostTemplate
		content={ post.html }
		contentComponent={ HTMLContent }
		helmet={ <Helmet title={ `Blog | ${ post.frontmatter.title }` } /> }
		title={ post.frontmatter.title }
	/>;
}

export const pageQuery = graphql`
	query BlogPostByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				date(formatString: "MMMM DD, YYYY")
				title
				image
				draft
			}
		}
	}
`;
