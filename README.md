# Crypto Index Fund

A DIY crypto index fund based on Google spreadsheet and [Coinmarketcap](https://coinmarketcap.com/api/) APIs

## Features

* Prices updated from [Coinmarketcap](https://coinmarketcap.com)
* Automatically rebalancing based on target allocations
* Configurable the Fiat currency (e.g. EUR or USD )
* Adding recurring deposits to your crypto portfolio
* Configurable _Hard Cap_ to avoid BTC or other currencies dominance

## Disclaimer

I'm **not** a trader and I don't have any professional finance experience.
Use the spreadsheet at own risk.

## Assumptions

* I did this as an exercise to learn more about the Crypto currencies market
* The most important signal used to calculate the target allocation it's the currency market cap.
* I prefer [rebalancing](https://en.wikipedia.org/wiki/Rebalancing_investments) rather then betting / trading based on rumors / news / gut
* Rebalancing helps you to sell high and buy low, it takes the emotion out of trying to call the bottom or the top.
* _Hard cap_ is a way to avoid BTC to be too large in your portfolio.
* Crypto market has an **high** volatility do rebalance at least a couple of time per month or when you hit the _Rebalance warning_ limit
* Coinmarketcap APIs provide the currency average price. You could have significant discrepancy from their data and you exchange

##Conventions:

* Green fields are the inputs. Aka edit only them.
* Blue fields are calculated. they represent the actionable actions (E.g buy or sell # coins)

## How to start the portfolio

* Make a copy of the [Crypto Index Fund](https://goo.gl/v7ViJC) (aka a Google spreadsheet)
* Adding or remove your currencies (_Asset Name_ aka column _B10_ )
* Configure _Fiat Currency_ (e.g. USD or EUR)
* Configure the _Hard Cap_ (e.g. 15% with 10 currencies, 10% with 20 currencies, etc )
* Configure the _Rebalance warning_ (e..g. 5%).
* Populate the spreadsheet. From the menu click on _Crypto Portfolio_ => _Refresh_
* Give the required permissions to run the script

### Authentication required

![alt text](screenshots/1_auth_required.png | height=300)

### App not verified

![alt text](screenshots/2_app_not_verified.png | height=300)

### Go to CC import

![alt text](screenshots/3_go_to_CC_import.png | height=300)

### Permissions

![alt text](screenshots/3_go_to_CC_import.png | height=300)

_notice:_ I know, all those permissions are scary. Double check in the `src/index.js` how it works :)

## How to re-balance the portfolio

* Add or adjust the recurring deposits aka _K3_ column
* Refresh the data. From the menu click on _Crypto Portfolio_ => _Refresh_
* For each currency pick _# of coins to buy or sell_ and execute the order on your exchange

## Alternatives

* [crypto20.com](https://crypto20.com/)
* [crypto-sheets](https://github.com/saitei/crypto-sheets)

## Credits

A nice post [Portfolio Reblancing Tool](https://steemit.com/cryptocurrency/@thorthur22/portfolio-reblancing-tool-using-google-sheets-quadruple-your-earnings)

The super cool [Crypto20 Whitepaper](https://static.crypto20.com/pdf/c20-whitepaper.pdf?_ga=2.92950557.1013622623.1514504485-1579083509.1512601968)

Kudoz [@segrate](https://twitter.com/segrate) for his help / feedback.

## Development

    yarn install

Edit the src/index.js

    yarn build

Copy the build/index.js into your Google spreadsheet. From the menu:

    Tools => Script Editors...

Then run the updated version from the menu:

    Crypto Portfolio => Refresh
