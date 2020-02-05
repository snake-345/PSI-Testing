/**
 * @module AppointmentWidget
 */
Moff.modules.create('AppointmentWidget', function() {
    'use strict';

    const _appointment = this;

    let _externalModule,
        _dateField,
        _data,
        _time,
        _dealerId;

    let _datepicker = null;

    let _cache = {};

    let _checked = '';

    let _checkedMonth = '';

    this.init = function() {
        _externalModule = this.config.module;
        _dateField = _externalModule.$find('.js-appointment-date');
        _dealerId = _externalModule.$find('.js-appointment-dealer-id');
        _data = [{
                name: 'form_type',
                value: _externalModule.$find('.js-appointment-type').val(),
            },
            {
                name: 'dealer_id',
                value: _dealerId.val(),
            },
        ];
        _time = _externalModule.$find('.js-appointment-time');

        _dateField.on('focus', () => {
            _appointment.open();
        });

        _externalModule.$find('.js-location').on('change', function() {
            const value = $(this).val();

            _appointment.destroyDatepicker();
            _time.val('');
            _time.prop('disabled', true);

            if (value) {
                _data[1].value = value;
                _dealerId.val(value);
                _dateField.prop('disabled', false);
                _appointment.initDatepicker();
            } else {
                _dateField.prop('disabled', true);
            }
        });

        $('body').on('click', event => {
            const isDatepicker = !!$(event.target).closest('.js-appointment-datepicker').length;
            const isDateField = $(event.target).is(_dateField);

            if (!isDatepicker && !isDateField) {
                _appointment.close();
            }
        });
    };

    this.initDatepicker = function(isOpen) {
        _externalModule.ajaxRequest({
            action: 'datepickerRender',
            pushState: false,
            data: _data.concat([{
                name: 'date',
                value: _dateField.data('init-date'),
            }]),
            success(html) {
                append(html);
                _cache[_dateField.data('init-date')] = html;
                datepickerHandlers();

                if (isOpen) {
                    setPosition();
                    _appointment.open();
                }
            },
        });
    };

    this.update = function(date) {
        if (_cache[date]) {
            append(_cache[date]);
        } else {
            _externalModule.ajaxRequest({
                action: 'datepickerRender',
                pushState: false,
                data: _data.concat([{
                    name: 'date',
                    value: date,
                }]),
                preloader: {
                    show() {
                        Moff.ajaxSystem.showPreloader(_datepicker);
                    },
                    hide() {
                        Moff.ajaxSystem.hidePreloader(_datepicker);
                    },
                },
                success(html) {
                    append(html);
                    _cache[date] = html;
                },
            });
        }
    };

    this.updateTime = function(date) {
        if (date) {
            _externalModule.ajaxRequest({
                action: 'availableHours',
                pushState: false,
                data: _data.concat([{
                    name: 'date',
                    value: date,
                }]),
                success(data) {
                    _time.removeAttr('disabled');
                    appendTime(generateTimeSlots(data));
                    if (typeof data === 'string') {
                        _time.attr('disabled', 'disabled');
                        _cache = {};
                        _appointment.resetDate();
                        _appointment.update(_checkedMonth);
                    }
                },
            });
        }
    };

    this.open = function() {
        if (!_datepicker) {
            _appointment.initDatepicker(true);
        } else {
            setPosition();
            _datepicker.slideDown(250);
        }
    };

    this.close = function() {
        if (!_datepicker) {
            return false;
        }
        _datepicker.slideUp(250);

        return true;
    };

    this.selectDate = function(date) {
        _appointment.resetDate();
        _datepicker.find(`[data-day="${date}"]`).addClass('first-date-selected');
        _checked = date;
        _dateField.val(date);
        _dateField.trigger('keyup');
    };

    this.resetDate = function() {
        _checked = '';
        _datepicker.find('.first-date-selected').removeClass('first-date-selected');
        _dateField.val('');
    };

    this.destroyDatepicker = function() {
        if (_datepicker) {
            _cache = {};
            _checked = '';
            _datepicker.remove();
            _datepicker = null;
            _dateField.val('');
        }
    };

    function append(pickerHtml) {
        if (!_datepicker) {
            $(_externalModule.scope).append(pickerHtml);
            _datepicker = _externalModule.$find('.js-appointment-datepicker').hide();
        } else {
            _datepicker.html($(pickerHtml).html());
        }
        _appointment.selectDate(_checked);
    }

    function appendTime(html) {
        _time.html(html);
    }

    function generateTimeSlots(data) {
        let options = '';

        if (data) {
            if (typeof data === 'string') {
                return `<option value=''>${data}</option>`;
            }
            Object.keys(data || {}).forEach(text => {
                options += `<option value='${text}'>${data[text]}</option>`;
            });
        }

        return options;
    }

    function setPosition() {
        const isAbove = (_dateField[0].getBoundingClientRect().top + _dateField.outerHeight() + _datepicker.outerHeight()) >
            document.documentElement.clientHeight;

        if (isAbove) {
            _datepicker.addClass('__above');
        } else {
            _datepicker.removeClass('__above');
        }

        _datepicker.css(calculatePosition(isAbove));
    }

    function calculatePosition(isAbove = false) {
        const _externalModuleOffset = $(_externalModule.scope).offset();
        const _dateFieldOffset = _dateField.offset();

        if (isAbove) {
            return {
                top: 'auto',
                bottom: $(_externalModule.scope).outerHeight() - (_dateFieldOffset.top - _externalModuleOffset.top),
                left: _dateFieldOffset.left - _externalModuleOffset.left,
            };
        }
        return {
            top: _dateFieldOffset.top + _dateField.outerHeight() - _externalModuleOffset.top,
            bottom: 'auto',
            left: _dateFieldOffset.left - _externalModuleOffset.left,
        };
    }

    function datepickerHandlers() {
        _datepicker
            .on('click', '.prev, .next', function(event) {
                const arrow = $(this);

                if (!arrow.hasClass('disabled')) {
                    _appointment.update(arrow.data('month'));
                }

                event.stopPropagation();
            })
            .on('change', 'select', function(event) {
                const date = $(this).val();

                _appointment.update(date);

                event.preventDefault();
            })
            .on('click', '.day.valid', function() {
                _checkedMonth = $(this).data('month');
                _appointment.selectDate($(this).data('day'));
                _appointment.close();
                _appointment.updateTime($(this).data('day'));
                _dateField.parsley().validate();
            });
    }
});