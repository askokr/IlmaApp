# IlmaÄpp

Find current weather by location. Built with ReactJS

## How it works

On search a query is sent to the Yahoo! weather API via Y̲ahoo Q̲uery L̲anguage:

`https://query.yahooapis.com/v1/public/yql?q=select ${QUERY} from weather.forecast where woeid in (select woeid from geo.places(1) where text="${PLACE}") and u="${UNITS}"&format=json`

This provides all the weather data needed. The response includes astronomical info but as times are given with abbrevated time zones, they are rather hard to process. Hence the latitude and longitiude provided by Yahoo!

{ LATITUDE, LONGITUDE } = response.query.results.channel.item;

are forwarded to the Sunrise-Sunset API

`https://api.sunrise-sunset.org/json?lat=${LATITUDE}&lng=${LONGITUDE}&formatted=0`

for astronomical data in in UTC. These datetimes are compared to the current time to find out wether to display day- or nighttime images.

The app has an Estonian UI but searches can be made in any language.

## Built With

- [Bootstrap](https://www.npmjs.com/package/bootstrap/) - Appearance
- [Jquery](https://www.npmjs.com/package/jquery) - Dependency of Bootstrap
- [Propper.js](https://www.npmjs.com/package/propper.js) - Dependency of Bootstrap
- [React-Debounce-Input](https://www.npmjs.com/package/react-debounce-input/) - To cut down all the rerenders during input
- [React-GH-Corner](https://www.npmjs.com/package/react-gh-corner) - To provide a link to GitHub
- [React-Responsive](https://www.npmjs.com/package/react-responsive) - For the MediaQuery element
- [Styled-Components](https://www.npmjs.com/package/styled-components) - Dependency of React-GH-Corner

- [Clouds moving CSS animation](https://codepen.io/antonioescudero/pen/zrxGve) - Background animation

## Author

© Asko Kriiska 2018

## License

This project is licensed under the MIT License
