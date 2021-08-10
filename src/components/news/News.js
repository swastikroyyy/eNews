import React, { useState, useEffect } from 'react'
import "./News.css"

const News = () => {
    const [news, setNews] = useState([])
    const [sear, setSear] = useState("")

    useEffect(() => {
        let params = {
            api_key: "fa8ad67d6c74459faaa9dea33bb5731e",
            query: "microsoft"
        }
        let api_url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(params.query)}&apiKey=${encodeURIComponent(params.api_key)}`

        const data = async () => {
            await fetch(api_url,
                {
                    method: "get"

                })
                .then(response => {
                    return response.json()
                })
                .then(res => {
                    console.log(res.articles)
                    setNews(res.articles)



                })

        }

        data()

    }, []);
    const realValue = (e) => {
        setSear(e.target.value)


    }
    const searchNews = () => {

        let params = {
            api_key: "fa8ad67d6c74459faaa9dea33bb5731e",
            query: sear
        }
        let api_url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(params.query)}&apiKey=${encodeURIComponent(params.api_key)}`

        fetch(api_url,
            {
                method: "get"

            })
            .then(response => {
                setSear("");
                return response.json()
            })
            .then(res => {
                console.log(res.articles)
                setNews(res.articles)
                if (res.articles.length === 0) {

                    setSear("")

                }

            })
    }



    console.log("news", news);



    return (

        <div className="article">
            <div className="he">e-News</div>
            <div className="con">

                <input className="search" type="text" value={sear} placeholder="Search Your favourite News" onChange={(e) => realValue(e)} />
                <button className="button" onClick={searchNews}>search</button>
                <h1>All News</h1>

                {

                    news.length === 0 ? (<h2>No Search Data Found</h2>) :
                        (news.map((con, index) => {
                            return (<div key={index} className="art">
                                <div className="pa">
                                    <div className="ni">
                                        <img className="img" src={con.urlToImage} alt="img"></img>
                                    </div>
                                    <div className="nd">
                                        <h2>{con.title}</h2>
                                        <p>{con.author}</p>
                                        <p>{con.description}</p>
                                        <p>
                                            <a href={con.url} target="blank">
                                                <button className="button">Read More</button>

                                            </a>
                                        </p>

                                    </div>

                                </div>
                            </div>)
                        }))


                }
            </div>

        </div>
    )
}

export default News
