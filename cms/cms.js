import React from 'react'
import CMS from 'netlify-cms'

// import Features from './../src/site/components/Features'
// import Testimonials from './../src/site/components/Testimonials'
// import Pricing from './../src/site/components/Pricing'

import { AboutPageTemplate } from './../src/templates/about-page.jsx';
import { ProductPageTemplate } from './../src/templates/product-page.jsx';
import { BlogPostTemplate } from './../src/templates/blog-post.jsx';

const AboutPagePreview = ({ entry, widgetFor }) =>
  <AboutPageTemplate title={entry.getIn(['data', 'title'])} content={widgetFor('body')} />;

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
)

const ProductPagePreview = ({ entry, widgetFor, getAsset }) => {
  const entryBlurbs = entry.getIn(['data', 'intro', 'blurbs'])
  const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  const entryPricingPlans = entry.getIn(['data', 'pricing', 'plans'])
  const pricingPlans = entryPricingPlans ? entryPricingPlans.toJS() : []

  return <ProductPageTemplate
    image={entry.getIn(['data', 'image'])}
    title={entry.getIn(['data', 'title'])}
    heading={entry.getIn(['data', 'heading'])}
    description={entry.getIn(['data', 'description'])}
    intro={{ blurbs }}
    main={{
      heading: entry.getIn(['data', 'main', 'heading']),
      description: entry.getIn(['data', 'main', 'description']),
      image1: {
        image: getAsset(entry.getIn(['data', 'main', 'image1', 'image'])),
        alt: entry.getIn(['data', 'main', 'image1', 'alt']),
      },
      image2: {
        image: getAsset(entry.getIn(['data', 'main', 'image2', 'image'])),
        alt: entry.getIn(['data', 'main', 'image2', 'alt']),
      },
      image3: {
        image: getAsset(entry.getIn(['data', 'main', 'image3', 'image'])),
        alt: entry.getIn(['data', 'main', 'image3', 'alt']),
      },
    }}
    fullImage={entry.getIn(['data', 'full_image'])}
    testimonials={testimonials}
    pricing={{
      heading: entry.getIn(['data', 'pricing', 'heading']),
      description: entry.getIn(['data', 'pricing', 'description']),
      plans: pricingPlans,
    }}
  />;
}

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)