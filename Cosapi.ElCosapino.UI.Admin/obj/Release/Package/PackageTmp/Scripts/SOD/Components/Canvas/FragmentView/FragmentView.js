﻿/// Copyright (c) 2015.
/// All rights reserved.
/// <summary>
/// Controlador de progreso de carga o peticiones
/// </summary>
/// <remarks>
/// Creacion: 	Canvas(CERS) 20150107 <br />
/// </remarks>
ns('Pe.Canvas.UI.Web.Components.FragmentView');
Pe.Canvas.UI.Web.Components.FragmentView = function (opts) {
    this.init(opts);
};

Pe.Canvas.UI.Web.Components.FragmentView.prototype = {
    init: function (opts) {
    },

    setContent: function (idDivFragmentView, html) {
        if ($("#" + idDivFragmentView)) {
            $("#" + idDivFragmentView).empty()
            $("#" + idDivFragmentView).html(html);
        }
    },

    getAjaxContent: function (opts) {
        var me = this;
        //$('body').addClass('loading');
        var ajaxBuscar = new Pe.Canvas.UI.Web.Components.Ajax({
            action: opts.action,
            dataType: 'html',
            locationLoading: opts.locationLoading,
            updatePanel: opts.idDivFragmentView,
            data: opts.data,
            onSuccess: function (html) {
                //me.setContent(opts.idDivFragmentView, html);
                if (opts.onSuccess) {
                    opts.onSuccess.apply(opts.scope ? opts.scope : me, [html, opts.customParam]);
                }
            }
        });
    },

};
