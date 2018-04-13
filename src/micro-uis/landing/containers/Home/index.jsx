import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactSpotlight, ReactCarousel } from "react-ref-result";
import { ReactA11yTitle } from "react-ref-extensions";
import styles from "./styles.css";
import * as actionsTopics from "../../actions/topics";
import * as actionsCarousel from "../../actions/carousel";

export class Home extends Component {

  componentDidMount() {
    /* istanbul ignore else  */
    if (!this.props.hasFetchedTopics) {
      this.props.actions.getTopics();
    }
    /* istanbul ignore else  */
    if (!this.props.hasFetchedCarousel) {
      this.props.actions.getCarousel();
    }
  }

  render() {
    const { topicsData, carouselData } = this.props;
    
    return (
      <ReactA11yTitle title="Home">
        <div className={styles.Home}>
          <section className={styles.Home_sectionFullScreen}>
            <ReactCarousel images={carouselData.items}>
              Search Container Here.
            </ReactCarousel>
          </section>
          <section className={styles.Home_section}>
            <ReactSpotlight topics={topicsData} />
          </section>
        </div>
      </ReactA11yTitle>
    );
  }
};

const mapStateToProps = (state) => {
  const {
    data: topicsData,
    error: topicsError,
    isFetching: isFetchingTopics,
    hasFetched: hasFetchedTopics
  } = state.topics;

  const {
    data: carouselData,
    error: carouselError,
    isFetching: isFetchingCarousel,
    hasFetched: hasFetchedCarousel
  } = state.carousel;

  return {
    topicsData,
    topicsError,
    isFetchingTopics,
    hasFetchedTopics,
    carouselData,
    carouselError,
    isFetchingCarousel,
    hasFetchedCarousel
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, actionsTopics, actionsCarousel), dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
