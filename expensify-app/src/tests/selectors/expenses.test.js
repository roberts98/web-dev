import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';

const expenses = [{
  id: '1',
  description: 'Bin',
  note: '',
  amount: 3000,
  createdAt: 0
}, {
  id: '2',
  description: 'Gloves',
  note: '',
  amount: 50000,
  createdAt: moment(0).subtract(10, 'days').valueOf()
}, {
  id: '3',
  description: 'Cards',
  note: '',
  amount: 500,
  createdAt: moment(0).add(10, 'days').valueOf()
}]

test('should filter by text value', () => {
  const filters = {
    text: 'i',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0] ]);
});

test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[0] ]);
});

test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[1] ]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ])
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[1], expenses[0], expenses[2] ])
});

