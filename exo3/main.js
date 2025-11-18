const amountInput = document.querySelector('#order-amount');
const shippingSelect = document.querySelector('#shipping-type');
const calcButton = document.querySelector('#calc-btn');
const resultEl = document.querySelector('#result');

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

const SHIPPING_STRATEGIES = {
  standard: {
    baseCost: 4.99,
    freeThreshold: 50,
    calculate: (orderAmount) => {
      return orderAmount >= SHIPPING_STRATEGIES.standard.freeThreshold
        ? 0
        : SHIPPING_STRATEGIES.standard.baseCost;
    }
  },
  express: {
    baseCost: 9.99,
    freeThreshold: 100,
    calculate: (orderAmount) => {
      return orderAmount >= SHIPPING_STRATEGIES.express.freeThreshold
        ? 0
        : SHIPPING_STRATEGIES.express.baseCost;
    }
  },
  pickup: {
    baseCost: 2.99,
    freeThreshold: 30,
    calculate: (orderAmount) => {
      return orderAmount >= SHIPPING_STRATEGIES.pickup.freeThreshold
        ? 0
        : SHIPPING_STRATEGIES.pickup.baseCost;
    }
  }
};

function calculateShippingCost(type, orderAmount) {
  const strategy = SHIPPING_STRATEGIES[type];

  if (strategy && typeof strategy.calculate === 'function') {
    return strategy.calculate(orderAmount);
  }

  return 0;
}

calcButton.addEventListener('click', () => {
  const type = shippingSelect.value;
  const amount = Number(amountInput.value) || 0;

  const shippingCost = calculateShippingCost(type, amount);
  resultEl.textContent =
    'Frais de livraison : ' + formatPrice(shippingCost);
});