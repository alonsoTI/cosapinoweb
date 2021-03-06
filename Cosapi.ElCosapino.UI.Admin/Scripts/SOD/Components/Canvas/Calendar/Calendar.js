﻿/// <summary>
/// Controlador de progreso de carga o peticiones
/// </summary>
/// <remarks>
/// Creacion: 	EDGAR MELGAREJO 20140707 <br />
/// </remarks>
ns('Pe.Canvas.UI.Web.Components.Calendar');
Pe.Canvas.UI.Web.Components.Calendar = function (opts) {
    this.init(opts);
};

Pe.Canvas.UI.Web.Components.Calendar.prototype = {
    changeDateFrom: null,
    changeDateTo: null,
    inputFrom: null,
    inputTo: null,
    inputHour: null,
    selectInputFrom: null,
    selectInputTo: null,
    selectInputHour: null,
    is12HourFormat: null,
    divMessage: null,

    init: function (opts) {
        this.inputHour = opts.inputHour ? opts.inputHour : null;
        this.inputFrom = opts.inputFrom ? opts.inputFrom : null;
        this.inputTo = opts.inputTo ? opts.inputTo : null;
        this.divMessage = opts.divMessage ? opts.divMessage : null;
        this.changeDateFrom = opts.changeDateFrom ? opts.changeDateFrom : null;
        this.changeDateTo = opts.changeDateTo ? opts.changeDateTo : null;

        var me = this;
        //this._privateFunction
        if (me.inputHour && me.inputHour != null) {
            me.is12HourFormat = me.is12HourFormat == null ? true : me.is12HourFormat;

            me.inputHour.datetimepicker({
                format: Pe.Canvas.UI.Web.Formato.Hora,
                pickDate: false,
                pick12HourFormat: me.is12HourFormat
            });

            if (this.selectInputHour != null) {
                me.inputHour.focusout(this.selectInputHour);
            }
            var zIndexInputHour = parseInt(me.inputHour.zIndex());
            $(".bootstrap-datetimepicker-widget").zIndex(zIndexInputHour + 1);
        }

        if (this.inputFrom && this.inputFrom != null) {
            var configFrom = {
                dateFormat: Pe.Canvas.UI.Web.Formato.Fecha,
                minDate: new Date(),
                onClose: function (selected) {
                    var result = Pe.Canvas.UI.Web.Components.Util.ValidateBlurOnlyDate(this);
                    if (me.inputTo && me.inputTo != null) {
                        if (result) {
                            me.inputTo.datepicker('option', 'minDate', selected);
                        }
                        else {
                            me.inputTo.datepicker('option', 'minDate', null);
                        }
                    }
                    if (result) {
                        if (me.changeDateFrom != null) {
                            me.changeDateFrom.call(this, $.datepicker.parseDate(Pe.Canvas.UI.Web.Formato.Fecha, selected))
                        }
                    } else {
                        if (me.changeDateFrom != null) {
                            me.changeDateFrom.call(this, null);
                        }
                    }
                },
                onSelect: this.selectInputFrom
            };
            if (opts.maxDateFrom && opts.maxDateFrom != null) {
                configFrom.maxDate = opts.maxDateFrom;
            }
            if (opts.minDateFrom && opts.minDateFrom != null) {
                configFrom.minDate = opts.minDateFrom;
            }
            this.inputFrom.datepicker(configFrom);
            this.inputFrom.bind("blur", function () {
                return Pe.Canvas.UI.Web.Components.Util.ValidateBlurOnlyDate(this);
            });
            this.inputFrom.mask(Pe.Canvas.UI.Web.Formato.FechaMascara);
            if (me.inputTo && me.inputTo != null) {
                this.inputFrom.change(function () {
                    if ($(this).val() == "" || $(this).val() == null) {
                        me.inputTo.datepicker('option', 'minDate', null);
                        if (me.changeDateFrom != null) {
                            me.changeDateFrom.call(this, null);
                        }
                    }
                });
            }
        }

        if (this.inputTo && this.inputTo != null) {
            var configTo = {
                dateFormat: Pe.Canvas.UI.Web.Formato.Fecha,
                onClose: function (selected) {
                    var result = Pe.Canvas.UI.Web.Components.Util.ValidateBlurOnlyDate(this);
                    if (me.inputFrom && me.inputFrom != null) {
                        if (result) {
                            me.inputFrom.datepicker('option', 'maxDate', selected);
                        }
                        else {
                            me.inputFrom.datepicker('option', 'maxDate', null);
                        }
                    }
                    if (result) {
                        if (me.changeDateTo != null) {
                            me.changeDateTo.call(this, $.datepicker.parseDate(Pe.Canvas.UI.Web.Formato.Fecha, selected));
                        }
                    } else {
                        if (me.changeDateTo != null) {
                            me.changeDateTo.call(this, null);
                        }
                    }
                },
                'minDate': this.inputFrom.val() != "" ? this.inputFrom.val() : null,
                onSelect: this.selectInputTo
            };
            if (opts.maxDateTo && opts.maxDateTo != null) {
                configTo.maxDate = opts.maxDateTo;
            }
            this.inputTo.datepicker(configTo);
            this.inputTo.bind("blur", function () {
                return Pe.Canvas.UI.Web.Components.Util.ValidateBlurOnlyDate(this);
            });
            //this.inputTo.mask(Pe.Canvas.UI.Web.Formato.Fecha);
            this.inputTo.mask(Pe.Canvas.UI.Web.Formato.FechaMascara);
            if (me.inputFrom && me.inputFrom != null) {
                this.inputTo.change(function () {
                    if ($(this).val() == "" || $(this).val() == null) {
                        me.inputFrom.datepicker('option', 'maxDate', null);
                        if (me.changeDateTo != null) {
                            me.changeDateTo.call(this, null);
                        }
                    }
                });
            }
        }
    },

    destroy: function () {
        if (this.inputFrom) {
            this.inputFrom.datepicker("destroy");
        }
        if (this.inputTo) {
            this.inputTo.datepicker("destroy");
        }
    },

    _privateFunction: {
        createDatePicker: function (input, reference) {
            if (input && input != null) {
                input.datepicker({
                    dateFormat: Pe.Canvas.UI.Web.Formato.Fecha,
                    onClose: function (selected) {
                        if (reference && reference != null) {
                            reference.datepicker('option', 'minDate', selected);
                        }
                    }
                });
            }
        }
    }
};
