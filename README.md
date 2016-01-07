# techfeedyservice

- This is the backend service that does
    1) Call OAuth secured Product Hunt API
    2) RSS Feed for Hacker News, Tech Crunch and Tech Meme
    3) Pulls the Twitter Trend from Twitter API based on particular Location or World
    
- Sample Requests
    1) Product Hunt - http://techfeedyservice.herokuapp.com/producthunt
    2) Hacker News - http://techfeedyservice.herokuapp.com/hackernews
    3) Twitter Trend in Memphis - http://techfeedyservice.herokuapp.com/tweet/trends?lat=35.037735&long=-89.720763
    
- Techs
    1) Framework - ExpressJs, NodeJs
    2) DB - PostGreSQL (To store the OAUTH token)
    3) Hosted on Heroku
    
- This supports the http://www.techfeedy.info 
