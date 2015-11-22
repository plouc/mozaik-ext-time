# Mozaïk time widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-time.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-time)
[![NPM version](https://img.shields.io/npm/v/mozaik-ext-time.svg?style=flat-square)](https://www.npmjs.com/package/mozaik-ext-time)

## Time — Clock

> Show analog clock from local or anoter timezone.

![clock](https://raw.githubusercontent.com/plouc/mozaik-ext-time/master/preview/time.clock.png)

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | no       | *Title of the widget*
`timezone` | no       | *Name of the timezone, like `America/Los_Angeles`. See http://momentjs.com/timezone/ for possible values. Defaults to local time.*
`info`     | no       | *Free textual value to show within clock. Special values are: `timezone`, `date`, `time`.
`sunRise`  | no       | *Local time when sun rises (used for day/night indicator). Defaults to `6:00`.*
`sunSet`   | no       | *Local time when sun sets (used for day/night indicator). Defaults to `18:00`.*

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
  sunRise: '6:30',
  sunSet: '17:43',
  columns: 1, rows: 1, x: 1, y: 0
},
{
  type: 'time.clock',
  info: 'Time is money!',
  columns: 1, rows: 1, x: 2, y: 0
}
```