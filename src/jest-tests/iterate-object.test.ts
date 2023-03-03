// import { iterateObject } from './iterate-object';
import { iterateObject } from '../br-core/iterate-object';

describe('iterateObject', (): void => {
  const getActualOutput = (item: any): [string, any][] => {
    const actual: [string, any][] = [];
    iterateObject(item, (key, value) => actual.push([key, value]));
    return actual;
  };

  test('Iterating over shallow values should output the provided item.', () => {
    // Arrange
    const items = [
      123,
      'foo',
      null,
      undefined,
      true,
      {},
      []
    ];
    const expected: any[] = items.map((item) => {
      return ['', item];
    });

    // Act
    const actual = [
      ...items.map((item) => getActualOutput(item)[0])
    ];

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Iterating over a shallow array should output each item in the array.', () => {
    // Arrange
    const item: any[] = [
      123,
      'foo',
      null
    ];
    const expected: [string, any][] = [
      ['', item],
      ...item.map((value, index): [string, any] => {
        return [`[${index}]`, value];
      })
    ];

    // Act
    const actual = getActualOutput(item);

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Iterating over a shallow object should output each property with its value.', () => {
    // Arrange
    const item = {
      foo: 'bar',
      id: null
    };
    const expected: [string, any][] = [
      ['', item],
      ...Object.entries(item)
    ];

    // Act
    const actual = getActualOutput(item);

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Iterating over a deep object should output deep properties.', () => {
    // Arrange
    const item = {
      children: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      foo: 'bar'
    };
    const expected: [string, any][] = [
      ['', item],
      ['children', item.children],
      ['children[0]', item.children[0]],
      ['children[0].id', item.children[0]?.id],
      ['children[1]', item.children[1]],
      ['children[1].id', item.children[1]?.id],
      ['foo', item.foo]
    ];

    // Act
    const actual = getActualOutput(item);

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Iterating over a 3D array should output deeply nested array items.', () => {
    // Arrange
    const item = [
      [[1, 3]],
      [2]
    ] as const;
    const expected: [string, any][] = [
      ['', item],
      ['[0]', item[0]],
      ['[0][0]', item[0][0]],
      ['[0][0][0]', item[0][0][0]],
      ['[0][0][1]', item[0][0][1]],
      ['[1]', item[1]],
      ['[1][0]', item[1][0]]
    ];

    // Act
    const actual = getActualOutput(item);

    // Assert
    expect(actual).toEqual(expected);
  });
});
