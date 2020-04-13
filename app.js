var budgetController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expenses = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allitems: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    additem: function (type, des, val) {
      var ID;
      if (data.allitems[type].length > 0) {
        data.allitems[type][data.allitems[type].length - 1].id - 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        var newItem = new Expenses(ID, des, val);
      } else if (type === "inc") {
        var newItem = new Income(ID, des, val);
      }
      data.allitems[type].push(newItem);
      return newItem;
    },
  };
})();

var UIController = (function () {
  var DOMStrings = {
    inputdescription: ".add__description",
    inputtype: ".add__type",
    inputvalue: ".add__value",
    inputBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputtype).value,
        description: document.querySelector(DOMStrings.inputdescription).value,
        value: document.querySelector(DOMStrings.inputvalue).value,
      };
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

var appController = (function (budgetCtrl, UICtrl) {
  var setUpEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlStuff);
    document.addEventListener("keypress", function (event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlStuff();
      }
    });
  };

  var ctrlStuff = function () {
    //get the input

    var input = UICtrl.getInput();
    console.log(input);

    // add the item to the budget contoller
    var addStuff = budgetCtrl.additem(
      input.type,
      input.description,
      input.value
    );

    // display the item in the UI

    // calculate the budget

    // display the budget
  };

  return {
    init: function () {
      console.log("fuck we on top");
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

appController.init();
