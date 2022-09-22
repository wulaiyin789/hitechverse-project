import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to Hi-Techverse',
    description: 'Best Hi-Tech products for you.',
    keywords: 'valuable electronics, cheapest electronics'
};

export default Meta;
