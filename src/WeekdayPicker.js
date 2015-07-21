import React, { Component, PropTypes } from "react";
import DayPicker from "react-day-picker";
Utils = DayPicker.defaultProps.localeUtils;

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

    modifiers: PropTypes.object,

    locale: PropTypes.string,
    localeUtils: PropTypes.shape({
      formatWeekdayShort: PropTypes.func.isRequired,
      formatWeekdayLong: PropTypes.func.isRequired
    }),

    onWeekdayClick: PropTypes.func,
    onWeekdayTouchTap: PropTypes.func,
    onWeekdayMouseEnter: PropTypes.func,
    onWeekdayMouseLeave: PropTypes.func

  }

  static defaultProps = {
    tabIndex: 0,
    locale: "en",
    localeUtils: Utils
  }

  constructor(props) {
    super(props);
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
        style={style}
        role="widget"
        tabIndex={ tabIndex }
        onKeyDown={ ::this.handleKeyDown }
      >
        { this.renderWeekDays() }
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
            { weekdays }
          </div>
        </div>
      </div>
    );
  }

  renderWeekday(weekday) {
    const { locale, localeUtils, modifiers: modifierFunctions } = this.props;

    let className = "DayPicker-Weekday";
    let modifiers = [];

    if (modifierFunctions) {
      const customModifiers = Utils.getModifiersForDay(weekday, modifierFunctions);
      modifiers = [...modifiers, ...customModifiers];
    }

    className += modifiers.map(modifier => ` ${className}--${modifier}`).join("");

    const { onWeekdayMouseEnter, onWeekdayMouseLeave, onWeekdayTouchTap, onWeekdayClick }
      = this.props;
    let tabIndex = null;
    if (onWeekdayTouchTap || onWeekdayClick) {
      tabIndex = -1;
      // Focus on the first day of the week
      if (weekday === 0) {
        tabIndex = this.props.tabIndex;
      }
    }
    return (
      <div key={weekday} className={className} tabIndex={ tabIndex }
        onMouseEnter= { onWeekdayMouseEnter ?
          (e) => this.handleWeekdayMouseEnter(e, weekday, modifiers) : null }
        onMouseLeave= { onWeekdayMouseLeave ?
          (e) => this.handleWeekdayMouseLeave(e, weekday, modifiers) : null }
        onClick= { onWeekdayClick ?
          (e) => this.handleWeekdayClick(e, weekday, modifiers) : null }
        onTouchTap= { onWeekdayTouchTap ?
          (e) => this.handleWeekdayTouchTap(e, weekday, modifiers) : null }
      >
        <attr title={localeUtils.formatWeekdayLong(weekday, locale)}>
          { localeUtils.formatWeekdayShort(weekday, locale) }
        </attr>
      </div>
    );
  }

  // Event handlers
  handleKeyDown(e) {
    switch (e.keyCode) {
      case keys.LEFT:
        this.showPreviousMonth();
      break;
      case keys.RIGHT:
        this.showNextMonth();
      break;
    }
  }

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
        if (this.props.onDayClick) {
          this.handleDayClick(e, day, modifiers);
        }
        if (this.props.onDayTouchTap) {
          this.handleDayTouchTap(e, day, modifiers);
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
