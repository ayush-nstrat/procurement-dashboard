sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("nstrat.procurement.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set default mock data model manually to avoid Work Zone manifest parsing issues
            var oModel = new JSONModel(sap.ui.require.toUrl("nstrat/procurement/localService/mockdata/data.json"));
            this.setModel(oModel);

            // enable routing
            this.getRouter().initialize();
        }
    });
});
