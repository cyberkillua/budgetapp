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
    this.percentage = -1;
  };

  Expenses.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expenses.prototype.getPercentage = function () {
      return this.percentage;
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
    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allitems[type].map(function (current) {
        return current.id;
      });

      index - ids.indexOf(id);

      if (index !== -1) {
        data.allitems[type].splice(index, 1);
      }
    },
    calculateBudget: function () {
      //calculate the total inc and exp
      calculateTotal("inc");
      calculateTotal("exp");

      //calculate the budget
      data.budget = data.total.inc - data.total.exp;

      // calculate the percentage
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    calculatePercent: function () {
      data.allitems.exp.forEach(function (cur) {
        cur.calcPercentage(data.total.inc);
      });
    },

    getPercent: function () {
      var allPercent = data.allitems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPercent;
    },

    getbudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage,
      };
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
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expPercentage: ".item__percentage"
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
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      } else if (type === "exp") {
        element = DOMStrings.listexpense;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%,", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteStuff: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
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

    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentage: function(percentages) {
      var fields = document.querySelectorAll(DOMStrings.expPercentage)

      var NodeListforEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
          callback(list[i], i)
        }

      }

      NodeListforEach(fields, function(current, index){
        if(percentages[index] > 0){
          current.textContent = percentages[index] + '%'
        } else{
          current.textContent = '---'
        }

        
      })
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
      document.querySelector(DOM.container).addEventListener("click", dltItem);
    });
  };
  var calcBudget = function () {
    // calculate the budget
    budgetCtrl.calculateBudget();
    // return the budget
    var budget = budgetCtrl.getbudget();

    // display on the UI
    UICtrl.displayBudget(budget);
    console.log(budget);
  };
  var calculatePercentage = function () {
    // 1. calculate pecentage
    budgetCtrl.calculatePercent();

    //2. get the percentage
    var percentage = budgetCtrl.getPercent();

    //4. update the UI

    UICtrl.displayPercentage(percentage);
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
      calculatePercentage();
    }
  };
  var dltItem = function (event) {
    var itemID, type, ID, splitItem;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitItem = itemID.split("-");
      type = splitItem[0];
      ID = parseInt(splitItem[1]);
    }

    budgetCtrl.deleteItem(type, ID);
    UICtrl.deleteStuff(itemID);
    calcBudget();
    calculatePercentage();
  };
  return {
    init: function () {
      console.log("fuck we on top");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

appController.init();
