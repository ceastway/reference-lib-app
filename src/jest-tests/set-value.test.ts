import { setValue } from '../br-core/set-value';

describe('setValue', () => {
  test('setting a shallow object value.', () => {
    // Arrange
    const item = { a: 1 };
    const innerValue = 2;
    const expected = { ...item, b: innerValue };

    // Act
    const actual = setValue(item, 'b', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a shallow array value.', () => {
    // Arrange
    const item = [15];
    const innerValue = 42;
    const expected = [...item, innerValue];

    // Act
    const actual = setValue(item, '[1]', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a deep object value.', () => {
    // Arrange
    const item = {
      a: {
        extra: 'abc'
      },
      foo: 'bar'
    };
    const innerValue = 42;
    const expected = { ...item, a: { ...item.a, b: innerValue } };

    // Act
    const actual = setValue(item, 'a.b', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a deep array value.', () => {
    // Arrange
    const item = [
      [
        4
      ]
    ] as const;
    const innerValue = 42;
    const expected = [ [ ...item[0], innerValue ] ];

    // Act
    const actual = setValue(item, '[0][1]', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a missing deep object value.', () => {
    // Arrange
    const item = {};
    const innerValue = 42;
    const expected = { a: { b: innerValue } };

    // Act
    const actual = setValue(item, 'a.b', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a missing deep array value.', () => {
    // Arrange
    const item = [] as const;
    const innerValue = 42;
    const expected = [ [ innerValue ] ];

    // Act
    const actual = setValue(item, '[0][0]', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a deep mixed array/object property.', () => {
    // Arrange
    const item = [] as const;
    const innerValue = 42;
    const expected = [ [ { a: { b: [ { c: innerValue } ] } } ] ];

    // Act
    const actual = setValue(item, '[0][0].a.b[0].c', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a property that causes an array to be filled.', () => {
    // Arrange
    const item = [] as const;
    const innerValue = 42;
    const expected = [ undefined, undefined, undefined, innerValue ];

    // Act
    const actual = setValue(item, '[3]', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });

  test('setting a deep property that causes an array to be filled.', () => {
    // Arrange
    const item = [] as const;
    const innerValue = 42;
    const expected = [ undefined, undefined, [ undefined, innerValue ] ];

    // Act
    const actual = setValue(item, '[2][1]', innerValue);

    // Assert
    expect(actual).toBe(item);
    expect(actual).toEqual(expected);
  });
});

test('set deep objects with object aready created ', () => {
  //Arrange
  const item = { child: 'hello' };
  const innerval = 1;
  const expected = {
    child: {
      child2: {
        id: innerval
      }
    }
  };

  // Act
  const actual = setValue(item, 'child.child2.id', innerval);

  // Assert 
  expect(actual).toBe(item);
  expect(actual).toEqual(expected);
});

test('set deep objects with array aready created ', () => {
  //Arrange
  const innerval = 1;
  const item = { child: [{child2: {id : innerval} }] };
  const expected = {
    child: {
      child2: {
        id: innerval
      }
    }
  };

  // Act
  const actual = setValue(item, 'child.child2.id', innerval);

  // Assert
  expect(actual).toBe(item);
  expect(actual).toEqual(expected);
});

test('set deep array with objects aready created ', () => {
  //Arrange
  const innerval = 1;
  const item = { child: {child2: {id : innerval} } };
  const expected = {
    child : [
      [
        { id: innerval }
      ]
    ]
  };

  // Act
  const actual = setValue(item, 'child[0][0].id', innerval);

  // Assert
  expect(actual).toBe(item);
  expect(actual).toEqual(expected);
});
