import { setValue } from '../br-core/set-value';

describe('setValue', (): void => {
  test('Setting a shallow value.', () => {
    // Arrange
    const children = [
      { id: 1 }
    ];
    const expected = { children };
  
    // Act
    const actual = setValue({}, 'children', children);
  
    // Assert
    expect(actual).toEqual(expected);
    expect(actual.children).toBe(expected.children);
  });
  
  test('Setting a deeply nested value.', () => {
    // Arrange
    const expected = {
      children: [
        { id: 1 }
      ]
    };
  
    // Act
    const actual = setValue({}, 'children[0].id', 1);
  
    // Assert
    expect(actual).toEqual(expected);
  });
});
