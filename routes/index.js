var express = require('express');
var router = express.Router();

const drinks = [
  '001-kombucha.svg',
  '002-milk box.svg',
  '003-coffee.svg',
  '004-wine.svg',
  '005-wine.svg',
  '006-champagne.svg',
  '007-martini.svg',
  '008-cosmopolitan.svg',
  '009-energy drink.svg',
  '010-cappuccino.svg',
  '011-cola.svg',
  '012-cola.svg',
  '013-matcha.svg',
  '014-chocolate milk.svg',
  '015-mimosa.svg',
  '016-soda.svg',
  '017-sangria.svg',
  '018-beer.svg',
  '019-lemonade.svg',
  '020-tea.svg',
  '021-milkshake.svg',
  '022-coffee.svg',
  '023-bubble tea.svg',
  '024-mojito.svg',
  '025-latte macchiato.svg',
  '026-infusion.svg',
  '027-horchata.svg',
  '028-Ice Tea.svg',
  '029-smoothie.svg',
  '030-beer.svg',
  '031-milk.svg',
  '032-milkshake.svg',
  '033-strawberry milk.svg',
  '034-whiskey.svg',
  '035-dalgona.svg',
  '036-smoothie.svg',
  '037-iced coffee.svg',
  '038-juice box.svg',
  '039-cocktail.svg',
  '040-soda.svg',
  '041-tea pot.svg',
  '042-punch.svg',
  '043-ramune.svg',
  '044-coconut.svg',
  '045-margarita.svg',
  '046-hot chocolate.svg',
  '047-water.svg',
  '048-cocktail shaker.svg',
  '049-cream soda.svg',
  '050-orange juice.svg'
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  {
     title: 'Buy me a drink',
     stripePublishableKey: process.env.STRIPE_PUBLISHABLE_API_KEY,
     drink: drinks[getRandomInt(drinks.length)] 
    }
    );
});

// Placeholder for success after checkout
router.get('/success', (req, res, next) => {
  res.redirect('/');
});

// Placeholder for error after checkout
router.get('/error', (req, res, next) => {
  res.redirect('/');
});

// Placeholder for cancel before checkout
router.get('/cancel', (req, res, next) => {
  res.redirect('/');
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = router;
