var budgetController = (function () {})();

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


    getDOMStrings: function(){
        return DOMStrings
    }

  };
})();

var appController = (function (budgetCtrl, UICtrl) {
  var ctrlStuff = function () {
    //get the input

    var input = UICtrl.getInput();
    console.log(input);

    // add the item to the budget contoller

    // display the item in the UI

    // calculate the budget

    // display the budget
  };

  var DOM = UICtrl.getDOMStrings()

  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlStuff);
  document.addEventListener("keypress", function (event) {
    if (event.keycode === 13 || event.which === 13) {
      ctrlStuff();
    }
  });
})(budgetController, UIController);
