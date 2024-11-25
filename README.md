# Twitter Trends

✋ Welcome to **twitter trends** built using [Node.js](https://nodejs.org) and [Redis](https://redis.io/).

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)
- **Redis** (Can use docker `docker run -d --name redis -p 6379:6379 redis`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jpacock/twitter-trends.git
   ```

2. Navigate into the project directory:
   ```bash
   cd twitter-trends
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```


## Running App
Start the development server with hot-reloading:
   ```
   npm run dev
   ```

## Validating Solution
Testing health:
   ```
   curl http://localhost:8080/health/ping
   ```
Creating tweets:
   ```
   curl -X POST "http://localhost:8080/tweet" -H "Content-Type: application/json" -d "{\"tweet\": \"Today is the 30 year anniversary of UNLV winning the national championship. Vegas was still a small town back then and as a kid growing up there nothing was bigger than the Runnin' Rebels. Still think this is the best college basketball team ever. #UNLV #Basketball\"}"
   ```
Checking the currently trending hashtags:
   ```
   curl localhost:8080/trending-hashtags
   ```
Checking the currently trending hashtags:
   ```
   curl localhost:8080/trending-hashtags
   ```


## Tweet Simulator
I created tweet simulator to simulate a high frequency of generic tweets to be able to see the trending windows change over time. To start the tweet simulator, in `.env`
   ```
   TWEET_SIMULATOR_ENABLED=TRUE
   ```

## Environment Variables

| Name                                  | Description                                                | Required | Default                  |
| ------------------------------------- | ---------------------------------------------------------- | -------- | ------------------------ |
| `LOG_LEVEL`                           | Level of logger (e.g. 'DEBUG', 'INFO', 'TRACE')            | No       | Info                     |
| `SERVER_HOST`                         | IP of host server                                          | No       | localhost                |
| `SERVER_PORT`                         | Port of host server                                        | No       | '8080'                   |
| `TRENDING_RECALCULATION_INTERVAL_SEC` | How often in seconds to store hashtags list                | No       | 10                       |
| `TRENDING_SIZE`                       | How many trending hashtags to save                         | No       | 10                       |
| `TWEET_DUPLICATE_INTERVAL_SEC`        | Duration in seconds to not allow tweet duplicates          | No       | 10                       |
| `TWEET_SIMULATOR_ENABLED`             | Enable Tweet Simulator                                     | No       | FALSE                    |
| `TWEET_GENERATION_INTERVAL_MS`        | Frequency in miliseconds for simulator to tweet            | No       | 10                       |


  ---  
  
Built with ❤️ by jordan
