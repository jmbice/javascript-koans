var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      var isMenuSafe = _(products).all(function(menuItem){
        return !menuItem["ingredients"].includes("mushrooms") && !menuItem["containsNuts"]
      })

      isMenuSafe ? productsICanEat = products : productsICanEat = _(products).filter(function(e){
        return !e["ingredients"].includes("mushrooms") && !e["containsNuts"]
      })

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    /* try chaining range() and reduce() */
    var sum = _.chain(_.range(1,1000))
                .reduce(function(prev, curr){
                  (curr % 3 === 0 || curr % 5 ===0) ? prev = prev + curr : prev;
                  return prev
                }, 0)
                .value()

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    // I feel confident using map, flatten, reduce, but they seem to be
    // unnecessary if we are updating the ingredientCount object. However,
    // for assignment purposes, I implemented them in a function that
    // both tabulates the ingredientCount object, and creates a new array based on
    // products array, which we work with to provide a single count value for
    // single menu item ingredient

    //if it were up to me, I would use map & include to update the ingredientCount
    //object, or I would chain map, flatten, reduce to provide the count, but not
    //both.
    var ingredientToTest = 'mushrooms'

    var tabulateIngredientsTwoWays = function(ingredient){
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        return ingredient === ingredientToTest ? ingredient = 1 : ingredient = 0;
    }

    var iterateMenuAndTabulateIngredients = function(menuItem){
        return menuItem.ingredients.map(tabulateIngredientsTwoWays)
    }

    var sumValues = function(prev, curr){
            return prev += curr;
        }

    var timesIngredientUsed = _(products).chain()
        .map(iterateMenuAndTabulateIngredients)
        .flatten()
        .reduce(sumValues, 0)
        .value()

      expect(ingredientCount[ingredientToTest]).toBe(timesIngredientUsed);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var getNumberRange = function(num){
      return _.range(1, num + 1);
    };
    // 1 - 1000 number
    // 0 - 999 index to access number
    var getDivisibleNumbers = function(num){
        var divisibleNumbers = [];
        var stop = false;
        getNumberRange(num).map(function(e){
          num % e === 0 ? divisibleNumbers.push(e) : null;
        })
        return divisibleNumbers.reverse();
    };

    var isPrime = function(num){
        return getDivisibleNumbers(num).length === 2 ? true : false;
    };

    var getLargestPrimeFactor = function (num){
      var primeFactors = getDivisibleNumbers(num).filter(isPrime)
      return primeFactors[0];
    };

    expect(getLargestPrimeFactor(12)).toBe(3);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });

});
