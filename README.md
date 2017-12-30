# Crypto Index Fund

A DIY crypto index fund based on Google spreadsheet and [Coinmarketcap](https://coinmarketcap.com/api/) APIs

## Features
- Prices updated from [Coinmarketcap](https://coinmarketcap.com)
- Automatically rebalancing based on target allocations
- Configure the Fiat currency (e.g. EUR or USD ) 
- Adding recurring deposits to your crypto portfolio
- Hard cap to avoid BTC dominance 

## Disclaimer
I'm *not* a trader and I don't have any professional finance experience. 
Use the spreadsheet at own risk 

## Assumptions
- I did this as an exercise to learn more about Crypto currencies market
- The most important input to define the target allocation is the currency market cap.  
- I prefer [rebalancing](https://en.wikipedia.org/wiki/Rebalancing_investments) rather then betting / trading based on rumors / news / gut 
- Rebalancing helps you to sell high and buy low, it takes the emotion out of trying to call the bottom or the top.
- _Hard cap_ is a way to avoid BTC to be too large in your portfolio.
- Crypto market has an high volatility do rebalance at least a couple of time per month or when you hit the _Rebalance warning_ limit

##Conventions:
- Put data only on green fields.
- Blue fields are actioanables (E.g buy or sell # coins)
      
## How to start the portfolio
 - Make a copy of the [Crypto Index Fund](https://docs.google.com/spreadsheets/d/1_VwUBw0Z03PVn_gMZQW-MnoXqri6VNxSySYQX5G70jA) (aka a Google spreadsheet)
- Adding or remove your currencies (_Asset Name_ aka column _B10_ )
- Configure _Fiat Currency_ (e.g. USD or EUR)
- Configure the _Hard Cap_ (e.g. 15% with 10 currencies, 10% with 20 currencies, etc ) 
- Configure the _Rebalance warning_ (e..g. 5%).
- Populate the spreadsheet. From the menu click on _Crypto Portfolio_ => _Refresh_  

## How to re-balance the portfolio
- Add or adjust the recurring deposits aka _K3_ column
- Refresh the data. From the menu click on _Crypto Portfolio_ => _Refresh_
- For each currency pick _# of coins to buy or sell_ and execute the order on your exchange

   
that will use the ICO funding to buy the underlying crypto assets.

## Alternatives
- [crypto20.com](https://crypto20.com/)
- [crypto-sheets](https://github.com/saitei/crypto-sheets)

## Credits
A nice post [Portfolio Reblancing Tool](https://steemit.com/cryptocurrency/@thorthur22/portfolio-reblancing-tool-using-google-sheets-quadruple-your-earnings)

The super cool [Crypto20 Whitepaper](https://static.crypto20.com/pdf/c20-whitepaper.pdf?_ga=2.92950557.1013622623.1514504485-1579083509.1512601968)

Kudoz [@segrate](https://twitter.com/segrate) for his help / feedback.   

