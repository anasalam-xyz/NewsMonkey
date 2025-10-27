import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    const updateNews = async (movePage, arr) => {
        props.setProgress(10);
        const nextPage = page + movePage;
        setPage(nextPage);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${nextPage}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(arr.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    const fetchMoreData = () => {
        setPage(page+1);
        updateNews(1, articles);
    }
    useEffect(()=>{
        document.title = "NewsMonkey"+(props.category==="general"?"":(" - "+props.category.charAt(0).toUpperCase()+props.category.slice(1)))+" - Top Headlines";
        updateNews(0, []);
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <h1 className='container' style={{marginTop: "64px"}}>NewsMonkey - Top {(props.category==="general"?"":(props.category.charAt(0).toUpperCase()+props.category.slice(1)))+" "}Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={page+1<=Math.ceil(totalResults/props.pageSize)}
                loader={<Spinner/>}>
                <div className="container">
                <div className="row my-1">
                    {(articles || []).map(element=>{
                        return (<div className="col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title} description={element.description?element.description.slice(0,64)+". . .":""} newsURL={element.url} imageURL={element.urlToImage?element.urlToImage:"https://images.nintendolife.com/114e7f97b9333/large.jpg"} author={element.author?element.author:"Unknown"} date={new Date(element.publishedAt).toGMTString()}/>
                        </div>);
                    })}
                </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    apiKey: PropTypes.string.isRequired,
}
News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 12,
    apiKey: ""
}

export default News
