import { groupBy } from '../br-core/group-by';

describe('groupItemsBy', (): void => {
  test('Group items by a shallow property.', () => {
    // Arrange
    const expected = [
      [1, [
        { id: 1, groupId: 1 },
        { id: 3, groupId: 1 }
      ]],
      [2, [
        { id: 2, groupId: 2 }
      ]]
    ];

    // Act
    const actual = groupBy(
      [
        { id: 1, groupId: 1 },
        { id: 2, groupId: 2 },
        { id: 3, groupId: 1 }
      ],
      (item) => item.groupId
    );

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Group primitive items.', () => {
    // Arrange
    const expected = [
      [true, [1, 3]],
      [false, [2, 4]]
    ];

    // Act
    const actual = groupBy(
      [1, 2, 3, 4],
      (item) => item % 2 === 1
    );

    // Assert
    expect(actual).toEqual(expected);
  });

  test('Group items using an object as a key.', () => {
    // Arrange
    const group1 = { id: 1, name: 'Group One' };
    const group2 = { id: 2, name: 'Group One' };
    const expected = [
      [group1, [
        { id: 1, group: group1 },
        { id: 3, group: group1 }
      ]],
      [group2, [
        { id: 2, group: group2 }
      ]]
    ];

    // Act
    const actual = groupBy(
      [
        { id: 1, group: group1 },
        { id: 2, group: group2 },
        { id: 3, group: group1 }
      ],
      (item) => item.group
    );

    // Assert
    expect(actual).toEqual(expected);
  });
});
