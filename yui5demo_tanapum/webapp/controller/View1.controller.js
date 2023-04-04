sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("yui5demotanapum.controller.View1", {
            onInit: function () {
                this._initModel();
                this._getTimelineSet();
                this._loadTimelineDtDialog();
            },

            _initModel: function(){
                var oData = {};
                var oModel = new JSONModel(oData);
                
                this.getView().setModel(oModel);
            },
            _getTimelineSet: function(){
                var that = this;
                
                var oService = this.getOwnerComponent().getModel();
                
                oService.read("/TimelineSet",{
                    success: function(oData, response){
                        that.getView().getModel().setProperty("/TimelineSet", oData.results);
                
                    },
                    error: function(oError){
                        MessageBox.error('Error');
                    }
                });
            },

            onPress: function(){
                // MessageBox.success('กดไม');
                this._timelineDtDialog.then(function(oDialog){
                    oDialog.open();
                });

                var that = this;
                var oService = this.getOwnerComponent().getModel();

                oService.setHeaders({
                    "zaction": "NEW"
                });

                oService.read("/TimelineSet(Username='',ItemNo='')",{
                    success: function(oData, response){
                        that.getView().getModel().setProperty("/Timeline", oData);
                    },
                    error: function(oError){
                        MessageBox.show("Error");
                    }
                });
            },

            onCloseTimelineDt:function(){
                this._timelineDtDialog.then(function(oDialog){
                    oDialog.close();
                });
            },

            _setTimelineDtBusy: function(bBusy){
                this.byId("idTimelineDtDialog").setBusy(bBusy);
                },
                
            onCreateTimelineDt: function(){
                var that = this;
                var oService = this.getOwnerComponent().getModel();
                
                
                var oTimeline = this.getView().getModel().getProperty("/Timeline");
                
                this._setTimelineDtBusy(true);
                
                oService.setHeaders({
                "zaction": "CREATE"
                });
                
                oService.create("/TimelineSet", oTimeline, {
                    success: function(oData, response){
                    that._timelineDtDialog.then(function(oDialog){
                        oDialog.close();
                    });
                    
                    that._getTimelineSet();
                    that._setTimelineDtBusy(false);
                    
                    },
                    error: function(oError){
                        MessageBox.show("Error");
                        that._setTimelineDtBusy(false);
                    }
                });
            },

            // Load Fragment, then add to view
            _loadTimelineDtDialog: function(){
                var oView = this.getView();
    
                if (!this._timelineDtDialog) {
                
                this._timelineDtDialog = Fragment.load({
                id: oView.getId(),
                name: "yui5demotanapum.view.TimelineDialog",
                controller: this
                }).then(function (oDialog) {
                oView.addDependent(oDialog);
                return oDialog;
                });
            }
            }
        });
    });
