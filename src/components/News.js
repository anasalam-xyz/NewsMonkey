import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    articles = [];
    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        apiKey: PropTypes.string.isRequired,
    }
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 12,
        apiKey: ""
    }
    constructor() {
        super();
        this.state = {
            totalResults: 0,
            articles: this.articles,
            loading: false,
            page: 1,
        }
    }
    async updateNews(movePage, arr) {
        this.props.setProgress(10);
        const nextPage = this.state.page + movePage;
        this.setState({page: nextPage, loading: true});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${nextPage}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: arr.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading:false
        });
        this.props.setProgress(100);
    }
    fetchMoreData = () => {
        this.setState({page: this.state.page+1});
        this.updateNews(1, this.state.articles);
    }
    async componentDidMount() {
        document.title = "NewsMonkey"+(this.props.category==="general"?"":(" - "+this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)))+" - Top Headlines";
        this.updateNews(0, []);
    }
    render() {
    return (
        <>
            <h1 className='container my-2'>NewsMonkey - Top {(this.props.category==="general"?"":(this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)))+" "}Headlines</h1>
            {/*this.state.loading && <Spinner/>*/}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.page+1<=Math.ceil(this.state.totalResults/this.props.pageSize)}
                loader={<Spinner/>}>
                <div className="container">
                <div className="row my-3">
                    {(this.state.articles || []).map(element=>{
                        return (<div className="col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title} description={element.description?element.description.slice(0,64)+". . .":""} newsURL={element.url} imageURL={element.urlToImage?element.urlToImage:"https://images.nintendolife.com/114e7f97b9333/large.jpg"} author={element.author?element.author:"Unknown"} date={new Date(element.publishedAt).toGMTString()}/>
                        </div>);
                    })}
                </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={()=>{this.updateNews(-1)}}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={()=>{this.updateNews(1)}}>Next &rarr;</button>
            </div> */}
        </>
        )
    }
}

export default News
