const HARD_CAP = SpreadsheetApp.getActiveSpreadsheet()
  .getRange('K5')
  .getValue();
const MAX_CURRENCIES = SpreadsheetApp.getActiveSpreadsheet()
  .getRange('B18')
  .getValue();
const CURRENCY = SpreadsheetApp.getActiveSpreadsheet()
  .getRange('K4')
  .getValue();
const CURRENCY_FORMAT = {
  EUR: '€ 00.000',
  USD: '$ 00.000',
};

const onOpen = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const entries = [
    {
      name: 'Refresh',
      functionName: 'refreshLastUpdate',
    },
  ];
  sheet.addMenu('Crypto Portfolio', entries);
};

const refreshLastUpdate = () => {
  SpreadsheetApp.getActiveSpreadsheet()
    .getRange('K2')
    .setValue(new Date().toUTCString());
  const totalMarketCap = getTotalMarketCap(CURRENCY);
  const currencies = getCurrencies(CURRENCY, MAX_CURRENCIES);
  const spreadsheetCurrencies = getColumnValues('B')
    .splice(1)
    .map(function(c) {
      return c.toLowerCase();
    }); // skip title
  const assets = currencies.filter(function(c) {
    return includes(spreadsheetCurrencies, c.name.toLowerCase());
  });
  fillSpreadsheet(totalMarketCap, assets);
};

const getCurrencies = (convert, limit) => {
  const response = UrlFetchApp.fetch(
    `https://api.coinmarketcap.com/v1/ticker/?convert=${convert}&limit=${limit}`
  );
  const json = response.getContentText();
  return JSON.parse(json);
};

function getTotalMarketCap(convert) {
  convert = convert || 'EUR';
  const response = UrlFetchApp.fetch(
    'https://api.coinmarketcap.com/v1/global/?convert=' + convert
  );
  const json = JSON.parse(response.getContentText());
  const market = json['total_market_cap_' + convert.toLowerCase()];
  return parseFloat(market);
}

function getColumnValues(column) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(column + ':' + column); // like A:A
  return range.getValues().reduce(function(memo, value) {
    return value[0] !== '' ? memo.concat(value) : memo;
  }, []);
}

function fillSpreadsheet(totalMarketCap, assets) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var portfolio = hardCap(assets, totalMarketCap, HARD_CAP);

  portfolio.forEach(function(asset) {
    const name = asset.name;
    const index = findInColumn('B', name);
    if (index !== -1) {
      const market = asset['market_cap_' + CURRENCY.toLowerCase()];
      const volume24h = asset['24h_volume_' + CURRENCY.toLowerCase()];
      const fiatPrice = parseFloat(asset['price_' + CURRENCY.toLowerCase()]);
      const btcPrice = parseFloat(asset.price_btc);
      sheet
        .getRange('C' + index)
        .setValue(Math.round(market))
        .setNumberFormat(CURRENCY_FORMAT[CURRENCY]);
      sheet
        .getRange('D' + index)
        .setValue(Math.round(volume24h))
        .setNumberFormat(CURRENCY_FORMAT[CURRENCY]);
      sheet.getRange('E' + index).setValue(asset.naturalRatio);
      sheet.getRange('F' + index).setValue(parseFloat(asset.percent_change_1h));
      sheet
        .getRange('G' + index)
        .setValue(parseFloat(asset.percent_change_24h));
      sheet.getRange('H' + index).setValue(parseFloat(asset.percent_change_7d));
      sheet
        .getRange('I' + index)
        .setValue(fiatPrice)
        .setNumberFormat(CURRENCY_FORMAT[CURRENCY]);
      sheet.getRange('J' + index).setValue(btcPrice);
      sheet.getRange('K' + index).setValue(Math.round(asset.rank));
      sheet.getRange('M' + index).setValue(asset.ratio);
    }
  });

  SpreadsheetApp.flush();
}

// Utilities

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const sum = (...args) => {
  return args.reduce(function(tot, value) {
    return tot + value;
  }, 0);
};

const hardCap = (assets, totalMarketCap, max) => {
  const market = totalMarketCap;

  const reBalance = (assets, max) => {
    const pickRatio = a => a['market_cap_' + CURRENCY.toLowerCase()] / market;
    const portfolioMarketCap = sum.apply(undefined, assets.map(pickRatio));

    const isOver = a => {
      return (
        parseFloat(
          a['market_cap_' + CURRENCY.toLowerCase()] /
            market /
            portfolioMarketCap
        ) >= max || a.ratio >= max
      );
    };

    const exceeding = assets.filter(isOver).map(function(a) {
      return a.id;
    });

    const assetsLessThanMax = assets
      .filter(a => includes(exceeding, a.id))
      .map(a => {
        return (
          a['market_cap_' + CURRENCY.toLowerCase()] /
          market /
          portfolioMarketCap
        );
      });
    const sumProduct = sum.apply(undefined, assetsLessThanMax);

    const portfolio = assets.map(function(a) {
      // FROM Excel to JS
      // E14=> ratio
      // SUMPRODUCT => sumProduct
      // F27 => exceeding.length
      // =if(F14;hard_cap;(E14/(1-SUMPRODUCT($E$14:$E$16;$F$14:$F$16)))*(1-hard_cap*$F$27))

      const naturalRatio = a['market_cap_' + CURRENCY.toLowerCase()] / market;
      const normalizeRatio = naturalRatio / portfolioMarketCap;
      const balanced =
        normalizeRatio / (1 - sumProduct) * (1 - max * exceeding.length);
      // console.log(a.symbol + ':' + normalizeRatio);
      return Object.assign({}, a, {
        naturalRatio: naturalRatio,
        ratio: normalizeRatio >= max || a.ratio >= max ? max : balanced,
      });
    });

    return portfolio.filter(function(a) {
      return a.ratio > max;
    }).length > 0
      ? reBalance(portfolio, max)
      : portfolio;
  };

  return reBalance(assets, max);
};

function findInColumn(column, data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var column = sheet.getRange(column + ':' + column); // like A:A

  var values = column.getValues();
  var row = 0;

  while (
    values[row] &&
    typeof values[row][0] === 'string' &&
    (values[row][0] || '').toLowerCase() !== data.toLowerCase()
  ) {
    row++;
  }

  if (
    values[row] &&
    typeof values[row][0] === 'string' &&
    (values[row][0] || '').toLowerCase() === data.toLowerCase()
  )
    return row + 1;
  else return -1;
}

const includes = (container, value) => container.indexOf(value) >= 0;

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}
