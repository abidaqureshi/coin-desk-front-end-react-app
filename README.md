# Coin Desk React App
- React web-app that based on the data from the public Coindesk API: https://www.coindesk.com/api
- The app should render a single web-page with an input for currency code. The input should be
“smart”: with auto-suggest &amp; debounce logic. Once user starts to type, he should see suggestions
with the available currency codes. As user selects a currency code the following info should be
displayed below the input:
- The current Bitcoin rate, in the requested currency
- List of historical Bitcoin rates in the requested currency for the last month
- Also, user should be able to clear input and check rates for another currency.
