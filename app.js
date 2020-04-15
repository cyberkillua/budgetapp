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

  var calculateTotal = function (type) {
    var sum = 0;
    data.allitems[type].forEach(function (current) {
      sum = sum + current.value;
    });
    data.total[type] = sum;
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
    budget: 0,
    percentage: -1,
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

    calculateBudget: function () {
      //calculate the total inc and exp
      calculateTotal("inc");
      calculateTotal("exp");

      //calculate the budget
      data.budget = data.total.inc - data.total.exp;

      // calculate the percentage
      data.percentage = (data.total.exp / data.total.inc) * 100;
    },

    getbudget: function(){
        return {
            budget: data.budget,
            totalInc: data.total.inc,
            totalExp: data.total.exp,
            percentage: data.percentage
        }
    }

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
        value: parseFloat(document.querySelector(DOMStrings.inputvalue).value),
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

    clearStuff: function () {
      var fields, fieldarr;
      fields = document.querySelectorAll(
        DOMStrings.inputdescription + ", " + DOMStrings.inputvalue
      );

      fieldarr = Array.prototype.slice.call(fields);

      fieldarr.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldarr[0].focus();
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
  var calcBudget = function () {
    // calculate the budget
     budgetCtrl.calculateBudget();
    // return the budget
    var fbudget = budgetCtrl.getbudget()

    // display on the UI
    console.log(fbudget)
  };

  var ctrlStuff = function () {
    //get the input

    var input = UICtrl.getInput();
    console.log(input);

    if (input.description != "" && !isNaN(input.value) && input.value > 0) {
      // add the item to the budget contoller
      var addStuff = budgetCtrl.additem(
        input.type,
        input.description,
        input.value
      );

      // display the item in the UI
      var listStuff = UICtrl.addList(addStuff, input.type);
      UICtrl.clearStuff();

      // call the calbudget function
      calcBudget();
    }
  };

  return {
    init: function () {
      console.log("fuck we on top");
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

appController.init();
