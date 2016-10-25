## School Analysis
This application is an attempt to consolidate NYC public school data and 
make it easier to search and compare schools' key metrics, with an emphasis
on objective measurements, class size, standardized test scores, and demographics. 
All data is from publicly available sites provided by NYC and State 
Department of Education:

* http://schools.nyc.gov/Accountability/data/default.htm
* https://nycopendata.socrata.com/data?cat=education
* https://data.nysed.gov/

Currently, the 'database' of school data is a single json file data/nyc.db.json.tar.gz which needs to be extracted. 

### Getting started
install [node](https://nodejs.org/en/download/)
Unzip data/nyc.db.json.tar.gz into the same directory.

```
npm install webpack -g
npm install

cd client
npm install
npm start

cd server 
npm install
npm start
```

Access http://localhost:3000/

### TODO
* Bugs
    * navigation bar does not show dropdown options for small screens    
* Data quality
    * Class sizes
        * Ingest 2015 class size data
        * re-ingest class sizes number of sections to allow accurate calculation of avg class size (weight factor)
* Features
    * Search
        * search should be limited (by the client) to top 20 results
        * search server should include total number
* Tech Debt
    * Implement hot reloading of server via node-mon or similar
    * create script for zipping/unzipping nyc.db.json
    * migrate data to embedded storage engine (along with tooling for ingestion of data)

