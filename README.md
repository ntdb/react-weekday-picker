# react-weekday-picker
[![build status](https://img.shields.io/travis/ntdb/react-weekday-picker/master.svg?style=flat-square)](https://travis-ci.org/ntdb/react-weekday-picker)
[![npm version](https://img.shields.io/npm/v/react-weekday-picker.svg?style=flat-square)](https://www.npmjs.com/package/react-weekday-picker)
[![npm downloads](https://img.shields.io/npm/dm/react-weekday-picker.svg?style=flat-square)](https://www.npmjs.com/package/react-weekday-picker)

Customizable weekday picker component for React.js.

<p align="center">
<img src="https://cloud.githubusercontent.com/assets/2095463/8815167/58a0fc9c-2fca-11e5-861c-59e0280809bb.png" width="300" />
</p>

This module is based very heavily off of [gpbl/react-day-picker](https://github.com/gpbl/react-day-picker) ([docs and examples](http://www.gpbl.org/react-day-picker/)).
* select weekdays with CSS modifiers
* easily change style and add content to weekday cells
* ready for i18n, with [moment.js](http://momentjs.com) or any other library

### Usage

```bash
npm install react-weekday-picker --save
```

```js 
import React from "react";
import WeekdayPicker from "react-weekday-picker";

class MyComponent extends React.Component {

  render() {
    var modifiers = {
      'weekend': function(weekday) {
        return weekday == 0 || weekday == 6;
      }
    };
  
    return <WeekdayPicker modifiers={modifiers} />
  }
}
```
