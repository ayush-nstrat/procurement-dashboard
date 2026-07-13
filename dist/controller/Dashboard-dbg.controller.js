sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    var ASSISTANT_URL = "https://ai-automation-preview-hho1qf94.eu10.sapdas-preview.cloud.sap/webclient/standalone/sap_digital_assistant";

    return Controller.extend("nstrat.procurement.controller.Dashboard", {

        onInit: function () {
            // Time-based greeting
            var oViewData = {};
            var iHour = new Date().getHours();
            var sName = this.getOwnerComponent().getModel().getProperty("/employee/name");

            if (iHour < 12) {
                oViewData.greeting = "Good Morning, " + (sName ? sName.split(" ")[0] : "");
            } else if (iHour < 17) {
                oViewData.greeting = "Good Afternoon, " + (sName ? sName.split(" ")[0] : "");
            } else {
                oViewData.greeting = "Good Evening, " + (sName ? sName.split(" ")[0] : "");
            }

            var oViewModel = new JSONModel(oViewData);
            this.getView().setModel(oViewModel, "view");
        },

        /**
         * Opens the SAP Digital Assistant in a new browser tab.
         */
        onOpenAssistant: function () {
            window.open(ASSISTANT_URL, "_blank", "noopener,noreferrer");
        },

        /**
         * Handles product list item press.
         */
        onProductPress: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext();
            var sName = oCtx.getProperty("name");
            MessageToast.show("Selected: " + sName);
        },

        /**
         * Handles accessory list item press — opens assistant.
         */
        onAccessoryPress: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext();
            var sName = oCtx.getProperty("name");
            MessageToast.show("Adding " + sName + " — opening assistant…");
            this.onOpenAssistant();
        },

        /**
         * Handles KPI tile press.
         */
        onKPIPress: function (oEvent) {
            var sHeader = oEvent.getSource().getHeader();
            MessageToast.show(sHeader + " — detail view coming soon.");
        },

        /**
         * Formatter for Status State
         */
        formatStatusState: function (sStatusType) {
            if (sStatusType === 'approved') {
                return 'Success';
            } else if (sStatusType === 'review') {
                return 'Warning';
            }
            return 'Information';
        },

        /**
         * Formatter for Priority State
         */
        formatPriorityState: function (sPriority) {
            if (sPriority === 'High') {
                return 'Error';
            } else if (sPriority === 'Medium') {
                return 'Warning';
            }
            return 'Success';
        }
    });
});
