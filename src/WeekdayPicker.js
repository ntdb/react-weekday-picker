import React, { Component, PropTypes } from 'react';
import { localeUtils } from './utils';

const keys = {
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  SPACE: 32
};

class WeekdayPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    tabIndex: PropTypes.number,

    ariaModifier: PropTypes.string,
    modifiers: PropTypes.object,

    locale: PropTypes.string,
    localeUtils: PropTypes.shape({
      formatWeekdayShort: PropTypes.func.isRequired,
      formatWeekdayLong: PropTypes.func.isRequired
    }),

    onWeekdayClick: PropTypes.func,
    onWeekdayMouseEnter: PropTypes.func,
    onWeekdayMouseLeave: PropTypes.func,
    onWeekdayTouchTap: PropTypes.func,
  }

  static defaultProps = {
    ariaModifier: 'selected',
    locale: 'en',
    localeUtils: localeUtils,
    tabIndex: 0,
  }

  getModifiersForDay(weekday, modifierFunctions) {
    const modifiers = [];
    if (modifierFunctions) {
      for (const modifier in modifierFunctions) {
        const func = modifierFunctions[modifier];
        if (func(weekday)) {
          modifiers.push(modifier);
        }
      }
    }
    return modifiers;
  }

  render() {
    const { locale, style, tabIndex } = this.props;
    let className = `WeekdayPicker DayPicker DayPicker--${locale}`;

    if (!this.props.onWeekdayClick && !this.props.onWeekdayTouchTap) {
      className = `${className} WeekdayPicker--InteractionDisabled`;
    }
    if (this.props.className) {
      className = `${className} ${this.props.className}`;
    }

    return (
      <div className={className}
        role="widget"
        style={style}
        tabIndex={ tabIndex }
      >
        {this.renderWeekDays()}
      </div>
    );
  }

  renderWeekDays() {
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(this.renderWeekday(i));
    }
    return (
      <div className="DayPicker-Month">
        <div className="DayPicker-Weekdays">
          <div>
            {weekdays}
          </div>
        </div>
      </div>
    );
  }

  renderWeekday(weekday) {
    const { locale, localeUtils, modifiers: modifierFunctions } = this.props;

    let className = 'DayPicker-Weekday';
    let modifiers = [];

    if (modifierFunctions) {
      const customModifiers = this.getModifiersForDay(weekday, modifierFunctions);
      modifiers = [...modifiers, ...customModifiers];
    }

    className += modifiers.map(modifier => ` ${className}--${modifier}`).join('');

    const ariaSelected = modifiers.indexOf(this.props.ariaModifier) > -1;

    const {
      onWeekdayClick,
      onWeekdayMouseEnter,
      onWeekdayMouseLeave,
      onWeekdayTouchTap,
    } = this.props;

    let tabIndex = null;
    if (onWeekdayTouchTap || onWeekdayClick) {
      tabIndex = -1;
      // Focus on the first day of the week
      if (weekday === 0) {
        tabIndex = this.props.tabIndex;
      }
    }

    let onClick = null;
    if (onWeekdayClick) {
      onClick = (e) => this.handleWeekdayClick(e, weekday, modifiers);
    }
    let onMouseEnter = null;
    if (onWeekdayMouseEnter) {
      onMouseEnter = (e) => this.handleWeekdayMouseEnter(e, weekday, modifiers);
    }
    let onMouseLeave = null;
    if (onWeekdayMouseLeave) {
      onMouseLeave = (e) => this.handleWeekdayMouseLeave(e, weekday, modifiers);
    }
    let onTouchTap = null;
    if (onWeekdayTouchTap) {
      onTouchTap = (e) => this.handleWeekdayTouchTap(e, weekday, modifiers)
    }

    return (
      <button key={weekday} className={className} tabIndex={tabIndex}
        aria-selected={ariaSelected}
        onClick= {onClick}
        onKeyDown={(e) => this.handleDayKeyDown(e, weekday, modifiers)}
        onMouseEnter={onMouseEnter}
        onMouseLeave= {onMouseLeave}
        onTouchTap= {onTouchTap}
      >
        <attr title={localeUtils.formatWeekdayLong(weekday, locale)}>
          {localeUtils.formatWeekdayShort(weekday, locale)}
        </attr>
      </button>
    );
  }

  focusPreviousDay(dayNode) {
    const body = dayNode.parentNode.parentNode.parentNode.parentNode;
    let dayNodes = body.querySelectorAll('.DayPicker-Weekday:not(.DayPicker-Weekday--outside)');
    let nodeIndex;
    for (let i = 0; i < dayNodes.length; i++) {
      if (dayNodes[i] === dayNode) {
        nodeIndex = i;
        break;
      }
    }
    if (nodeIndex !== 0) {
      dayNodes[nodeIndex - 1].focus();
    }
  }

  focusNextDay(dayNode) {
    const body = dayNode.parentNode.parentNode.parentNode.parentNode;
    let dayNodes = body.querySelectorAll('.DayPicker-Weekday:not(.DayPicker-Weekday--outside)');
    let nodeIndex;
    for (let i = 0; i < dayNodes.length; i++) {
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
  handleDayKeyDown(e, day, modifiers) {
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

  handleWeekdayTouchTap(e, weekday, modifiers) {
    e.persist();
    this.props.onWeekdayTouchTap(e, weekday, modifiers);
  }

  handleWeekdayClick(e, weekday, modifiers) {
    e.persist();
    this.props.onWeekdayClick(e, weekday, modifiers);
  }

  handleWeekdayMouseEnter(e, weekday, modifiers) {
    e.persist();
    this.props.onWeekdayMouseEnter(e, weekday, modifiers);
  }

  handleWeekdayMouseLeave(e, weekday, modifiers) {
    e.persist();
    this.props.onWeekdayMouseLeave(e, weekday, modifiers);
  }
}

export default WeekdayPicker;
