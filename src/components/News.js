import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';

export class News extends Component {
    articles = [];
    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
    }
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 12,
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
    async updateNews(movePage) {
        const nextPage = this.state.page + movePage;
        this.setState({page: nextPage, loading: true});
        const apiKey = "0d5188b775cc4e79abb2319447c2d002";
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${apiKey}&page=${nextPage}`;
        console.log(url)
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        });
    }
    async componentDidMount() {
        document.title = "NewsMonkey"+(this.props.category==="general"?"":(" - "+this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)))+" - Top Headlines";
        this.updateNews(0);
    }
    render() {
    return (
        <div className="container my-3">
            <h1>NewsMonkey - Top {(this.props.category==="general"?"":(this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)))+" "}Headlines</h1>
            {this.state.loading && <Spinner/>}
            {!this.state.loading && <div className="row my-3">
                {(this.state.articles || []).map(element=>{
                    return (<div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title} description={element.description?element.description.slice(0,64)+". . .":""} newsURL={element.url} imageURL={element.urlToImage?element.urlToImage:"https://images.nintendolife.com/114e7f97b9333/large.jpg"} author={element.author?element.author:"Unknown"} date={new Date(element.publishedAt).toGMTString()}/>
                    </div>);
                })}
            </div>}
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={()=>{this.updateNews(-1)}}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={()=>{this.updateNews(1)}}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default News
