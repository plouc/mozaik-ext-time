# Mozaïk time widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coverage-image]][coverage-url]
![widget count][widget-count-image]

> :warning: This branch holds the code for Mozaïk v2, if you're looking for v1,
> please have a look at the [dedicated branch](https://github.com/plouc/mozaik-ext-time/tree/mozaik-1). 

## Time — Clock

> Show analog clock from local or another timezone.

![clock](https://raw.githubusercontent.com/plouc/mozaik-ext-time/mozaik-2/preview/time.clock.png)

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | no       | *Title of the widget. Prefix it with `::` to [format](http://momentjs.com/docs/#/displaying/format/) with Moment.*
`timezone` | no       | *Name of the timezone, like `America/Los_Angeles`. See http://momentjs.com/timezone/ for possible values. Defaults to local time.*
`info`     | no       | *Free textual value to show within clock. Special values are: `timezone`, `date`, `time`.*
`sunRise`  | no       | *Local time when sun rises (used for day/night indicator). Defaults to `6:00`.*
`sunSet`   | no       | *Local time when sun sets (used for day/night indicator). Defaults to `18:00`.*

### usage

``` yaml
#
# Displaying date info
#
- extension:  time
  widget:     Clock
  info:       date
  columns:    1
  rows:       1
  x:          0
  y:          0

#
# Displaying timezone info
#  
- extension:  time
  widget:     Clock
  info:       timezone
  timezone:   America/Los_Angeles
  columns:    1
  rows:       1
  x:          1
  y:          0

#
# Displaying custom info
#  
- extension:  time
  widget:     Clock
  info:       Time is money!
  columns:    1
  rows:       1
  x:          2
  y:          0
```


## Time — DigitalClock

> Show digital clock from local or another timezone.

![clock](https://raw.githubusercontent.com/plouc/mozaik-ext-time/mozaik-2/preview/time.digital_clock.png)

### parameters

key              | required | default | description
-----------------|----------|---------|------------------------------------------
`displayDate`    | no       | `true`  | *Enable/disable date display.*
`displaySeconds` | no       | `true`  | *Enable/disable seconds display.*
`timezone`       | no       |         | *Name of the timezone, like `America/Los_Angeles`. See http://momentjs.com/timezone/ for possible values. Defaults to local time.*

### usage

``` yaml
- extension:      time
  widget:         DigitalClock
  columns:        1
  rows:           1
  x:              0
  y:              0

#
# Disabling time seconds
#  
- extension:      time
  widget:         DigitalClock
  displaySeconds: false
  columns:        1
  rows:           1
  x:              1
  y:              0

#
# Disabling date
#
- extension:      time
  widget:         DigitalClock
  displayDate:    false
  columns:        1
  rows:           1
  x:              2
  y:              0
```


[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-time.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-time/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-time.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-time
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-time.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-time
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-time.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-time
[coverage-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-time.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/plouc/mozaik-ext-time
[widget-count-image]: https://img.shields.io/badge/widgets-x2-green.svg?style=flat-square
