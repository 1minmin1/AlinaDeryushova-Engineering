define("UsrPlanetsb81ea3d5Section", [], function() {
	return {
		entitySchemaName: "UsrPlanets",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
   getActions: function() {
    /* Вызов базовой реализации метода для получения проиниализированных действий страницы. */
    var actions = this.callParent(arguments);
    /* Добавление линии-разделителя между вкладками действий. */
    actions.addItem(this.getButtonMenuItem({
     Type: "BPMSoft.MenuSeparator",
     Caption: ""
    }));
    actions.addItem(this.getButtonMenuItem({
     "Tag": "MyActionCaption",
     "Caption" : {"bindTo": "Resources.String.MyActionCaption"},
     "Enabled": {"bindTo": "getMyButtonEnabled"}
    }));
    /* Возвращение коллекции действий страницы. */
    return actions;
   },
   
   getMyButtonEnabled : function(){
    return true;
   },
   
   MyActionCaption : function(){
    BPMSoft.showInformation(
     Ext.String.format(
      this.get("Resources.String.MyActionMessage"),
       new Date().toLocaleString())
     );
   },},
	};
});
