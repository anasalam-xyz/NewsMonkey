
const NewsItem = (props) => {
        let {title, description, imageURL,  newsURL, author, date} = props;
        return (
            <div className="card" style={{width: "20rem"}}>
                <img src={imageURL} className="card-img-top" onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.nintendolife.com/114e7f97b9333/large.jpg";
                }} alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className="text-muted">By {author} on {date}</small></p>
                    <a href={newsURL} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>  
        )
}

export default NewsItem
