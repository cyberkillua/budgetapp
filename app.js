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
    listincome: ".income__list",
    listexpense: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputtype).value,
        description: document.querySelector(DOMStrings.inputdescription).value,
        value: document.querySelector(DOMStrings.inputvalue).value,
      };
    },

    addList: function (obj, type) {
      var html, newHtml, element;
      if (type === "inc") {
        element = DOMStrings.listincome;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.listexpense;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%,", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
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
       var listStuff = UICtrl.addList(addStuff, input.type)
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
