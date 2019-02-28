import Layout from '../components/layout';

const HelpPage = () =>  {
    return (
        <Layout>This is the help page</Layout>            
    )
}

HelpPage.getInitialProps = ():{} => {
    console.log('creating help page')
    return {};
}

export default HelpPage;