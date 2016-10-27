'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var keys = {
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  SPACE: 32
};

var WeekdayPicker = (function (_Component) {
  _inherits(WeekdayPicker, _Component);

  function WeekdayPicker() {
    _classCallCheck(this, WeekdayPicker);

    _get(Object.getPrototypeOf(WeekdayPicker.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WeekdayPicker, [{
    key: 'getModifiersForDay',
    value: function getModifiersForDay(weekday, modifierFunctions) {
      var modifiers = [];
      if (modifierFunctions) {
        for (var modifier in modifierFunctions) {
          var func = modifierFunctions[modifier];
          if (func(weekday)) {
            modifiers.push(modifier);
          }
        }
      }
      return modifiers;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var locale = _props.locale;
      var style = _props.style;
      var tabIndex = _props.tabIndex;

      var className = 'WeekdayPicker DayPicker DayPicker--' + locale;

      if (!this.props.onWeekdayClick && !this.props.onWeekdayTouchTap) {
        className = className + ' WeekdayPicker--InteractionDisabled';
      }
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      return _react2['default'].createElement(
        'div',
        { className: className,
          role: 'widget',
          style: style,
          tabIndex: tabIndex
        },
        this.renderWeekDays()
      );
    }
  }, {
    key: 'renderWeekDays',
    value: function renderWeekDays() {
      var weekdays = [];
      for (var i = 0; i < 7; i++) {
        weekdays.push(this.renderWeekday(i));
      }
      return _react2['default'].createElement(
        'div',
        { className: 'DayPicker-Month' },
        _react2['default'].createElement(
          'div',
          { className: 'DayPicker-Weekdays' },
          _react2['default'].createElement(
            'div',
            null,
            weekdays
          )
        )
      );
    }
  }, {
    key: 'renderWeekday',
    value: function renderWeekday(weekday) {
      var _this = this;

      var _props2 = this.props;
      var locale = _props2.locale;
      var localeUtils = _props2.localeUtils;
      var modifierFunctions = _props2.modifiers;

      var className = 'DayPicker-Weekday';
      var modifiers = [];

      if (modifierFunctions) {
        var customModifiers = this.getModifiersForDay(weekday, modifierFunctions);
        modifiers = [].concat(_toConsumableArray(modifiers), _toConsumableArray(customModifiers));
      }

      className += modifiers.map(function (modifier) {
        return ' ' + className + '--' + modifier;
      }).join('');

      var ariaSelected = modifiers.indexOf(this.props.ariaModifier) > -1;

      var _props3 = this.props;
      var onWeekdayClick = _props3.onWeekdayClick;
      var onWeekdayMouseEnter = _props3.onWeekdayMouseEnter;
      var onWeekdayMouseLeave = _props3.onWeekdayMouseLeave;
      var onWeekdayTouchTap = _props3.onWeekdayTouchTap;

      var tabIndex = null;
      if (onWeekdayTouchTap || onWeekdayClick) {
        tabIndex = -1;
        // Focus on the first day of the week
        if (weekday === 0) {
          tabIndex = this.props.tabIndex;
        }
      }

      var onClick = null;
      if (onWeekdayClick) {
        onClick = function (e) {
          return _this.handleWeekdayClick(e, weekday, modifiers);
        };
      }
      var onMouseEnter = null;
      if (onWeekdayMouseEnter) {
        onMouseEnter = function (e) {
          return _this.handleWeekdayMouseEnter(e, weekday, modifiers);
        };
      }
      var onMouseLeave = null;
      if (onWeekdayMouseLeave) {
        onMouseLeave = function (e) {
          return _this.handleWeekdayMouseLeave(e, weekday, modifiers);
        };
      }
      var onTouchTap = null;
      if (onWeekdayTouchTap) {
        onTouchTap = function (e) {
          return _this.handleWeekdayTouchTap(e, weekday, modifiers);
        };
      }

      return _react2['default'].createElement(
        'button',
        { key: weekday, className: className, tabIndex: tabIndex,
          'aria-pressed': ariaSelected,
          onClick: onClick,
          onKeyDown: function (e) {
            return _this.handleDayKeyDown(e, weekday, modifiers);
          },
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          onTouchTap: onTouchTap
        },
        _react2['default'].createElement(
          'attr',
          { title: localeUtils.formatWeekdayLong(weekday, locale) },
          localeUtils.formatWeekdayShort(weekday, locale)
        )
      );
    }
  }, {
    key: 'focusPreviousDay',
    value: function focusPreviousDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll('.DayPicker-Weekday:not(.DayPicker-Weekday--outside)');
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }
      if (nodeIndex !== 0) {
        dayNodes[nodeIndex - 1].focus();
      }
    }
  }, {
    key: 'focusNextDay',
    value: function focusNextDay(dayNode) {
      var body = dayNode.parentNode.parentNode.parentNode.parentNode;
      var dayNodes = body.querySelectorAll('.DayPicker-Weekday:not(.DayPicker-Weekday--outside)');
      var nodeIndex = undefined;
      for (var i = 0; i < dayNodes.length; i++) {
        if (dayNodes[i] === dayNode) {
          nodeIndex = i;
          break;
        }
      }

      if (nodeIndex !== dayNodes.length - 1) {
        dayNodes[nodeIndex + 1].focus();
      }
    }

    // Event handlers
  }, {
    key: 'handleDayKeyDown',
    value: function handleDayKeyDown(e, day, modifiers) {
      e.persist();
      switch (e.keyCode) {
        case keys.LEFT:
          e.preventDefault();
          e.stopPropagation();
          this.focusPreviousDay(e.target);
          break;
        case keys.RIGHT:
          e.preventDefault();
          e.stopPropagation();
          this.focusNextDay(e.target);
          break;
        case keys.ENTER:
        case keys.SPACE:
          e.preventDefault();
          e.stopPropagation();
          if (this.props.onWeekdayClick) {
            this.handleWeekdayClick(e, day, modifiers);
          }
          if (this.props.onWeekdayTouchTap) {
            this.handleWeekdayTouchTap(e, day, modifiers);
          }
          break;
      }
    }
  }, {
    key: 'handleWeekdayTouchTap',
    value: function handleWeekdayTouchTap(e, weekday, modifiers) {
      e.persist();
      this.props.onWeekdayTouchTap(e, weekday, modifiers);
    }
  }, {
    key: 'handleWeekdayClick',
    value: function handleWeekdayClick(e, weekday, modifiers) {
      e.persist();
      this.props.onWeekdayClick(e, weekday, modifiers);
    }
  }, {
    key: 'handleWeekdayMouseEnter',
    value: function handleWeekdayMouseEnter(e, weekday, modifiers) {
      e.persist();
      this.props.onWeekdayMouseEnter(e, weekday, modifiers);
    }
  }, {
    key: 'handleWeekdayMouseLeave',
    value: function handleWeekdayMouseLeave(e, weekday, modifiers) {
      e.persist();
      this.props.onWeekdayMouseLeave(e, weekday, modifiers);
    }
  }], [{
    key: 'propTypes',
    value: {
      className: _react.PropTypes.string,
      style: _react.PropTypes.object,
      tabIndex: _react.PropTypes.number,

      ariaModifier: _react.PropTypes.string,
      modifiers: _react.PropTypes.object,

      locale: _react.PropTypes.string,
      localeUtils: _react.PropTypes.shape({
        formatWeekdayShort: _react.PropTypes.func.isRequired,
        formatWeekdayLong: _react.PropTypes.func.isRequired
      }),

      onWeekdayClick: _react.PropTypes.func,
      onWeekdayMouseEnter: _react.PropTypes.func,
      onWeekdayMouseLeave: _react.PropTypes.func,
      onWeekdayTouchTap: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      ariaModifier: 'selected',
      locale: 'en',
      localeUtils: _utils.localeUtils,
      tabIndex: 0
    },
    enumerable: true
  }]);

  return WeekdayPicker;
})(_react.Component);

exports['default'] = WeekdayPicker;
module.exports = exports['default'];
//# sourceMappingURL=WeekdayPicker.js.map