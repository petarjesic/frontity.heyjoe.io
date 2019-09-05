import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page404 from "./page404.js";
import Loading from "./loading";
import Project from "./project";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import gridStyle from "bootstrap/dist/css/bootstrap-grid.css";
import cardStyle from "./styles/bootstrap-card.css";
import imageLigtboxStyle from './image-lightbox/style.css'
import { ToastContainer } from 'react-toastify';
import toastStyle from 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const Theme = ({ state, actions, libraries }) => {
  actions.source.fetch(state.router.link);
  const data = state.source.get(state.router.link);

  return (
    <>
      <Head>
        <title>{state.frontity.title}</title>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>
      <Global styles={globalStyles} />
      <Global styles={css(gridStyle)} />
      <Global styles={css(cardStyle)} />
      <Global styles={css(imageLigtboxStyle)} />
      <Global styles={css(toastStyle)} />
      <Global styles={css(bootstrap)} />
      <LoadingOverlay
        active={state.theme.isActive}
        spinner
        text='Processing...'
      >
        <Header />
        <Body>
          {data.isFetching && <Loading />}
          {data.isArchive && <List />}
          {data.isProject && <Project />}
          {/* {data.isPostType && <Post />} */}
          {data.is404 && <Page404 />}
          <ToastContainer />
        </Body>
      </LoadingOverlay>
    </>
  );
};

export default connect(Theme);

const Body = styled.div`
`;
