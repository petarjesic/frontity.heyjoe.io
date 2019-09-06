import React from 'react'
import { connect, styled } from 'frontity'
import PhotoGridItem from './photo-grid-item';
import PhotoListItem from './photo-list-item';
import Lightbox from './image-lightbox';
import axios from 'axios';
import { toast } from 'react-toastify';

const Project = ({ state, libraries }) => {
  // Get info of current post.
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  // Get the the post.
  const post = state.source[data.type][data.id];
  const images = post['wpcf-size-cards'];

  if (typeof post['wpcf-size-card-ratings'] === 'string') {
    if (post['wpcf-size-card-ratings'] === '')
      post['wpcf-size-card-ratings'] = {}
    else
      post['wpcf-size-card-ratings'] = JSON.parse(post['wpcf-size-card-ratings']);
  }

  let getUniqueCategories = [];
  for (var key in post['wpcf-size-card-ratings']) {
    if (getUniqueCategories.findIndex(e => e === post['wpcf-size-card-ratings'][key]) === -1) {
      getUniqueCategories.push(post['wpcf-size-card-ratings'][key]);
    }
  }

  const ratings = post['wpcf-size-card-ratings'];
  const photoIndex = state.theme.photoIndex;
  const isOpen = state.theme.photoIndex;

  const toggleActive = () => {
    this.setState({
      active: !this.state.active
    });
  }

  const selectCategory = (element) => {
    state.theme.selectedCategory = element;
  }

  const resetFilter = (element) => {
    this.setState({
      displayedCategories: PHOTODATA
    });
  }

  const openLightBox = (photoIndex) => {
    state.theme.isOpen = true;
    state.theme.photoIndex = photoIndex;
    // this.setState({ isOpen: true, photoIndex: photoIndex })
  }

  const handleListViewChecked = () => {
    state.theme.isListView = !state.theme.isListView;
  }

  const ratePhoto = (rate) => {
    post['wpcf-size-card-ratings'][photoIndex] = rate;
    // state.theme.isOpen = false;
  }

  const ratePhotoByIndex = (rate) => {
    post['wpcf-size-card-ratings'][rate.index] = rate.tag;
  }

  const handleCloseRequest = () => {
    state.theme.isOpen = false;
  }

  const handleMovePrevRequest = () => {
    state.theme.photoIndex = (photoIndex + images.length - 1) % images.length;
  }

  const handleMoveNextRequest = () => {
    state.theme.photoIndex = (photoIndex + 1) % images.length;
  }

  const saveProject = () => {
    state.theme.isActive = true;
    axios({
      method: 'POST',
      headers: { 'Authorization': `Basic ${btoa('petar:$q9vo)P#tz0rRgRLqIaLPwdT')}` },
      url: `https://heyjoe.io/wp-json/wp/v2/projects/${data.id}`,
      data: { 'wpcf-size-card-ratings': JSON.stringify(post['wpcf-size-card-ratings']) }
    }).then(response => {
      state.theme.isActive = false;
      toast.success('Saved successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
  }

  return data.isReady ? (
    <>
      <div className="pb-5 pt-5 bg-light">
        <div className="container">
          <TextCenter>
            <div className="btn-group" role="group">
              <button type="button" className={state.theme.selectedCategory == 'All' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={selectCategory.bind(null, 'All')}> All </button>
            </div>
            {
              getUniqueCategories.map(function (el, i) {
                return <button type="button"  className={state.theme.selectedCategory == el ? 'btn btn-primary' : 'btn btn-secondary'} onClick={selectCategory.bind(null, el)} category={el} key={i}>{el}</button>
              })
            }
          </TextCenter>
          <TextRight>
            <div>
              <div className="custom-control custom-switch mb-4">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={handleListViewChecked} />
                <label className="custom-control-label" htmlFor="customSwitch1">List View</label>
                <button type="button" className="btn btn-success btn-sm ml-4" onClick={saveProject}>Save</button>
              </div>
            </div>
          </TextRight>
          <div className="row">
            {
              !state.theme.isListView && post['wpcf-size-cards'].map(function (el, i) {
                if (post['wpcf-size-card-ratings'][i] == state.theme.selectedCategory || state.theme.selectedCategory === 'All')
                  return <PhotoGridItem key={i} index={i} imageUrl={el} category={'category'} title={'title'} description={'description'} rating={ratings[i]}
                    onClick={openLightBox.bind(null, i)} onRateClick={ratePhotoByIndex} />

                return null
              })
            }
            {
              state.theme.isListView && post['wpcf-size-cards'].map(function (el, i) {
                if (post['wpcf-size-card-ratings'][i] == state.theme.selectedCategory || state.theme.selectedCategory === 'All')
                  return <PhotoListItem key={i} index={i} imageUrl={el} category={'category'} title={'title'} description={'description'} rating={ratings[i]}
                    onClick={openLightBox.bind(null, i)} onRateClick={ratePhotoByIndex} />

                return null
              })
            }
          </div>
        </div>
      </div>
      {state.theme.isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onRateClick={ratePhoto}
          onCloseRequest={handleCloseRequest}
          onMovePrevRequest={handleMovePrevRequest}
          onMoveNextRequest={handleMoveNextRequest}
        >
        </Lightbox>
      )}
    </>
  ) : null;
}

export default connect(Project);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const TextRight = styled.div`
  text-align: right;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Body = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;