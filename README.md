# Mozaïk time widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-time.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-time)

## Time — Clock

> Show analog clock from local or anoter timezone.

![clock](https://raw.githubusercontent.com/plouc/mozaik-ext-time/master/preview/time.clock.png)

### parameters

key        | required                    | description
-----------|-----------------------------|----------------------------------------------------
`timezone` | no *(yes if `city` is set)* | *Name of the timezone, like `America/Los_Angeles`. See http://momentjs.com/timezone/ for possible values. Defaults to local time.*
`city`     | no                          | *Name of city used to fetch the local sunrise and -set info. By default, uses the city name from the timezone info, if available.*
`info`     | no                          | *Free textual value to show within clock. Special values are: `timezone`, `date`, `sun`, `time`.*

### usage

```javascript
{
  type: 'time.clock',
  info: 'date',
  columns: 1, rows: 1, x: 0, y: 0
},
{
  type: 'time.clock',
  timezone: 'America/Los_Angeles',
  info: 'timezone',
  columns: 1, rows: 1, x: 1, y: 0
},
{
  type: 'time.clock',
  timezone: 'Europe/Helsinki',
  city: 'Utsjoki',
  columns: 1, rows: 1, x: 2, y: 0
},
{
  type: 'time.clock',
  info: 'Time is money!',
  columns: 1, rows: 1, x: 3, y: 0
}
```