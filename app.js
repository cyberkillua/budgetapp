var budgetController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = id;
    this.value = value;
  };

  var Expenses = function (id, description, value) {
    this.id = id;
    this.description = id;
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
})();

var UIController = (function () {
  var DOMStrings = {
    inputText: ".add__description",
    inputType: ".add__type",
    inputNumber: ".add__value",
    inputBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        Text: document.querySelector(DOMStrings.inputText).value,
        Type: document.querySelector(DOMStrings.inputType).value,
        Number: document.querySelector(DOMStrings.inputNumber).value,
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
