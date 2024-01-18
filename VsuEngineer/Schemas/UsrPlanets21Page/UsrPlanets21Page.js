define("UsrPlanets21Page", [], function() {
	return {
		 "IsNew": {
        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: false
      },
		entitySchemaName: "UsrPlanets2",
		attributes:{
			"VisibleButton": {
        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: true
      }},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"UsrSchema2d28018dDetaila7b979ff": {
				"schemaName": "UsrSchema2d28018dDetail",
				"entitySchemaName": "UsrPhoto",
				"filter": {
					"detailColumn": "UsrUsrPlanets2",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrBooleanDec": {
				"f53d2451-8dfe-49f9-a698-9c5e41974646": {
					"uId": "f53d2451-8dfe-49f9-a698-9c5e41974646",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrBooleanDec"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
   
			save: function(){
      //this.isNew - new card
      this.set("IsNew",this.isNew);
      this.callParent(arguments);
    },
		hideButton: function(){
      //this.callParent(arguments);
      this.set("VisibleButton",false);
      
      console.log('метод hideButton');
    },
    showButton: function(){
      //this.callParent(arguments);
      this.set("VisibleButton",true);
      console.log('метод showButton');
    },	
			onSaved: function() {
				var allCount=0;
      this.callParent(arguments);
      
      console.log('метод onSaved');
      
      console.log(this.get('UsrSchema2d28018dDetaila7b979ff'));
	  var idPlanet = this.get('Id').toString();
      console.log(idPlanet);
      var esqQuery = Ext.create('BPMSoft.EntitySchemaQuery', {
    rootSchemaName: "UsrPhoto"
});
       	  esqQuery.addColumn("UsrUsrPlanets2");
		var filter = esqQuery.createColumnFilterWithParameter(
			BPMSoft.ComparisonType.EQUAL, "UsrUsrPlanets2", idPlanet);
    esqQuery.filters.addItem(filter);
			var count = 0;	
		esqQuery.getEntityCollection(function(response){
			var text = "";
			
			if(response.success){
				BPMSoft.each(response.collection.getItems(), function(item){
					if(count >= 3){
						var text = item.values.Id;
						
						
						var query1 = Ext.create("BPMSoft.DeleteQuery", {
      						rootSchemaName: "UsrPhoto"
    					});

    					var filter = BPMSoft.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "Id", text);
    					query1.filters.addItem(filter);
						query1.execute();
						
						
						console.log("delete: " + text); 
						count = count + 1;
					}else{
						var textt = item.values.Id;
						console.log(textt); 
						count = count + 1;	
					}
					
				}, this);
				console.log(count);
				while(count < 3){
					var insert = Ext.create('BPMSoft.InsertQuery', {
						rootSchemaName: "UsrPhoto"
					  });
					  insert.setParameterValue('Id', "",
						BPMSoft.DataValueType.GUID);
	  insert.setParameterValue('UsrName', "PhotoPlanet" + count,
						BPMSoft.DataValueType.TEXT);
	  
	  insert.setParameterValue('UsrUsrPlanets2', idPlanet,
						BPMSoft.DataValueType.GUID);
					  insert.execute();
					count = count + 1;
				}
			}
		}, this);
				var esqQueryPlanet = Ext.create('BPMSoft.EntitySchemaQuery', {
            rootSchemaName: "UsrPlanets2" 
        }); 
        esqQueryPlanet.addColumn("Id");
        esqQueryPlanet.addColumn("UsrName");

        //console.log(esqQueryPlanet);
        
        
        
        esqQueryPlanet.getEntityCollection(function(response2){
            if (response2.success){
               
            BPMSoft.each(response2.collection.getItems(), function(item2){
                idPlanet = item2.values.Id;
                
                //console.log(idPlanet);
                
                
                

                var esqQueryCount = Ext.create('BPMSoft.EntitySchemaQuery', {
                    rootSchemaName: "UsrPhoto" 
                });
                       esqQueryCount.addColumn("UsrUsrPlanets2");
                    var filterCount = esqQueryCount.createColumnFilterWithParameter(
                    BPMSoft.ComparisonType.EQUAL, "UsrUsrPlanets2", idPlanet);
                    esqQueryCount.filters.addItem(filterCount);
               
                esqQueryCount.getEntityCollection(function(response3){
                    
                    var countFoto = 0;
                    
                    if(response3.success){
                        BPMSoft.each(response3.collection.getItems(), function(item3){
                                countFoto = countFoto + 1;
                        }, this);
                        
                        if (countFoto == 3){
                        allCount = allCount + 1;
                        
                    }  
                    }
                    
                    console.log("2=" +allCount);

                    var text = "";
                    text += "Количество планет с тремя записями в деталях: " + allCount + "\n";
                   
                    BPMSoft.showInformation(text);

                    return allCount;
                    
                }, this);

            }, this); 
        }
        }, this)
		 
    },
			getMyButtonEnable: function(){
		  
				
            return true;
          },
          
      getMyButtonVisible: function(){
		  
				
            return true;
          },
      
          myActionClick: function(){
			 
            BPMSoft.showInformation(
                Ext.String.format(
                this.get("Resources.Strings.MyActionMessage"),
                new Date().toLocaleString())
        ); 
			 return true; 
      },
		getActions: function() {
        /* Вызов базовой реализации метода для получения проиниализированных действий страницы. */
        let actions = this.callParent(arguments);
        /* Добавление линии-разделителя между вкладками действий. */
        actions.addItem(this.getButtonMenuItem({
          Type: "BPMSoft.MenuSeparator",
          Caption: ""
        }));
        /* Добавление кастомного пункта в список действий. */
        actions.addItem(this.getButtonMenuItem({
          /* Привязка заголовка действия к локализуемой строке. */
          "Tag": "myActionClick",
          "Caption": {"bindTo": "Resources.Strings.MyActionCaption"},
          "enable": {"bindTo": "getMyButtonEnable"},
		  "Click" : {"bindTo": "showButton"}
        }));
		
        /* Возвращение коллекции действий страницы. */
        return actions;
      },
			
  },
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrNamefsasa",
				"values": {"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
	                              /* Тип добавляемого элемента — кнопка. */
	                              "itemType": BPMSoft.ViewItemType.BUTTON,
	                              /* Привязка заголовка кнопки к локализуемой строке схемы. */
	                              "caption":{bindTo:"Resources.Strings.UsrCancelEventButton"},
	                              /* Привязка метода-обработчика нажатия кнопки. */
	                              "click": { bindTo: "hideButton" },
	                              /* Стиль отображения кнопки. */
	                              "style": BPMSoft.controls.ButtonEnums.style.DEFAULT,
						   		  /* Стиль видимости кнопки. */
						   		  "visible": { bindTo: "VisibleButton" },
	                        },
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrName33fc259e-b22f-49c9-89ee-d3142f9ac274",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP58b8eb07-7da1-49de-9b31-ca62114bc68e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrDec",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER616373ef-b13b-4fc0-aedd-4670d0a8dccd",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrIntDec",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DATETIMEdda47758-d9f1-4434-8044-16bd6740513e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrDatetimeDec",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "BOOLEANb230c16f-22f3-4852-a1e6-aac3af64cbfe",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrBooleanDec",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "FLOAT99cedbb7-6fd8-49d1-9b80-c6098467dcdd",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrFloatDec",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema2d28018dDetaila7b979ff",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
