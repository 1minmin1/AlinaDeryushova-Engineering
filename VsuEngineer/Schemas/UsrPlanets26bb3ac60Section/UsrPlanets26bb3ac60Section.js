define("UsrPlanets26bb3ac60Section", [], function() {
	return {
		entitySchemaName: "UsrPlanets2",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
   
   showButton: function(){
      //this.callParent(arguments);
      this.set("VisibleButton",true);
      console.log('метод showButton');
    }, 
   getMyButtonEnable: function(){
    
    
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
	},};
	
});
