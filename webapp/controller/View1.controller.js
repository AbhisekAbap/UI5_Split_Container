sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],  
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("masterdetail.controller.View1", {
            onInit: function () {

            },
            onListPress: function(oEvent){
                let selectedValue = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");
                // let oModel = this.getOwnerComponent().getModel();
                // oModel.read("/Order_Details(" + selectedValue + ")", {
                //     success: function(oData){
                //         let jData = new JSONModel(oData);
                //         this.getView().byId("idOrderTable").setModel(jData);    
                //         this.getSplitObject().to(this.createId("idDetail"));
                //     },
                //     error: function(oError){
                //         console.log(oError);
                //     }
                // } );


                let oFilter = new sap.ui.model.Filter("OrderID",sap.ui.model.FilterOperator.EQ,selectedValue);
                this.getView().byId("idOrderTable").getBinding("items").filter([oFilter]);
                this.getSplitObject().to(this.createId("idDetail"));
            },
            onPressDetail: function(oEvent){
                let that = this;
                let selectedValue = oEvent.getSource().getBindingContext().getProperty("ProductID");
                let oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(" + selectedValue + ")", {
                    success: function(oData){
                        let jData = new JSONModel(oData);
                        that.getView().byId("_IDGenSimpleForm1").setModel(jData);    
                        that.getSplitObject().to(that.createId("idProductDetail"));
                    },
                    error: function(oError){
                        console.log(oError);
                    }
                } );
            },
            getSplitObject: function(){
                let result = this.byId("idSplitContainer");
                return result;
            },
            onProductBack: function(){
                this.getSplitObject().backDetail();
            }
        });
    });
