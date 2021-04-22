import './App.css';
import React from 'react';
import $ from 'jquery';
import { NavBar } from './navbar.js'
import { Header } from './header.js'
import Footer from './footer.js';
import axios from "axios";
import { getURL, LOSources } from "./list-of-sources";
import {ArticleDiv} from "./article-div";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.slideRef = React.createRef();
    this.slideNames = ["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"];
    this.state = {
      isLoading: [],
      articles1: [{url: "Loading...", title: "Loading...", description: "Loading...", sourceName: "Loading..."}],
      articles2: [{url: "Loading...", title: "Loading...", description: "Loading...", sourceName: "Loading..."}],
      articles3: [{url: "Loading...", title: "Loading...", description: "Loading...", sourceName: "Loading..."}],
      articles4: [{url: "Loading...", title: "Loading...", description: "Loading...", sourceName: "Loading..."}],
      articles5: [{url: "Loading...", title: "Loading...", description: "Loading...", sourceName: "Loading..."}],
      errors: null,
    }
  }


  handleScroll = (direction) => {
    if(direction === 'left') {
      this.slideRef.current.scrollLeft -= 200;
    } else {
      this.slideRef.current.scrollLeft += 200;
    }
  }

  getArticles(sourceName, artBias) {
    axios
        .get(getURL(sourceName))
        .then(response => {
          return response.data.data.map(article => ({
            title: `${article.title}`,
            url: `${article.url}`,
            description: `${article.description}`,
            sourceName: `${article.source}`
          }));
        })
        .then(articles => {
          if (artBias === 1) {
            this.setState({
              articles1: this.state.articles1.concat(articles),
              isLoading: [...this.state.isLoading, 1]
            });
          } else if (artBias === 2) {
            this.setState({
              articles2: this.state.articles2.concat(articles),
              isLoading: [...this.state.isLoading, 1]
            });
          } else if (artBias === 3) {
            this.setState({
              articles3: this.state.articles3.concat(articles),
              isLoading: [...this.state.isLoading, 1]
            });
          } else if (artBias === 4) {
            this.setState({
              articles4: this.state.articles4.concat(articles),
              isLoading: [...this.state.isLoading, 1]
            });
          } else if (artBias === 5) {
            this.setState({
              articles5: this.state.articles5.concat(articles),
              isLoading: [...this.state.isLoading, 1]
            });
          }
        })
        .catch(error => this.setState({error, isLoading: []}));
  }

  pickArticle(bias) {
    let pickedArt;
    if(this.state.isLoading.length >= 5) {
      if (bias === 1) {
        pickedArt = this.state.articles1[Math.floor(Math.random() * (this.state.articles1.length - 1))];
        //this.setState({articles1: this.state.articles1.filter((art) => art.title !== pickedArt.title)})
        return <ArticleDiv url={pickedArt.url} title={pickedArt.title} description={pickedArt.description}
                           sourceName={pickedArt.sourceName}/>;
      } else if (bias === 2) {
        pickedArt = this.state.articles2[Math.floor(Math.random() * (this.state.articles2.length - 1))];
        //this.setState({articles2: this.state.articles2.filter((art) => art !== pickedArt)})
        return <ArticleDiv url={pickedArt.url} title={pickedArt.title} description={pickedArt.description}
                           sourceName={pickedArt.sourceName}/>;
      } else if (bias === 3) {
        pickedArt = this.state.articles3[Math.floor(Math.random() * (this.state.articles3.length - 1))];
        //this.setState({articles3: this.state.articles3.filter((art) => art !== pickedArt)})
        return <ArticleDiv url={pickedArt.url} title={pickedArt.title} description={pickedArt.description}
                           sourceName={pickedArt.sourceName}/>;
      } else if (bias === 4) {
        pickedArt = this.state.articles4[Math.floor(Math.random() * (this.state.articles4.length - 1))];
        //this.setState({articles4: this.state.articles4.filter((art) => art !== pickedArt)})
        return <ArticleDiv url={pickedArt.url} title={pickedArt.title} description={pickedArt.description}
                           sourceName={pickedArt.sourceName}/>;
      } else if (bias === 5) {
        pickedArt = this.state.articles5[Math.floor(Math.random() * (this.state.articles5.length - 1))];
        //this.setState({articles5: this.state.articles5.filter((art) => art !== pickedArt)})
        return <ArticleDiv url={pickedArt.url} title={pickedArt.title} description={pickedArt.description}
                           sourceName={pickedArt.sourceName}/>;
      }
    } else {
      return <ArticleDiv url={"Loading..."} title={"Loading..."} description={"Loading..."} sourceName={"Loading..."} />
    }
  }


  componentDidMount() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    //1200
    $("#slide-container").animate({ scrollLeft:  (vw * .95)}, 500);

    LOSources.map((art) => {
      this.getArticles(art.name, art.bias);
    });

  }


  render() {


    return (
        <div>

          <Header />

          <NavBar onClick={this.handleScroll} />


          <div className="slider" id="slide-container" ref={this.slideRef}>
            {
              this.slideNames.map((slide, index) => {
                return (
                    <div className="slide" id={slide}>
                      {this.pickArticle(index + 1)}
                      {this.pickArticle(index + 1)}
                      {this.pickArticle(index + 1)}
                      {this.pickArticle(index + 1)}
                    </div>
                );
              })
            }
          </div>

          <Footer />


        </div>
    );
  }
}



export default App;