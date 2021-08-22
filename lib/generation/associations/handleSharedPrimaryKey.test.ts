import AccountSnapshot from '../../test/fixtures/snapshots/AccountSnapshot';
// eslint-disable-next-line
import AccountUserFKSnapshot from '../../test/fixtures/snapshots/AccountUserFKSnapshot';
import UserSnapshot from '../../test/fixtures/snapshots/UserSnapshot';
import handleSharedPrimaryKey, {
  incrementJoinColumnIfNeeded,
} from './handleSharedPrimaryKey';

describe('handleSharedPrimaryKey', () => {
  describe('OneToOne', () => {
    it('aliases names to prevent column conflicts', () => {
      const account = { ...AccountSnapshot };
      const user = { ...UserSnapshot };
      const fk = { ...AccountUserFKSnapshot };
      // TODO could replace with models here

      handleSharedPrimaryKey(account, fk, user);

      expect(account.oneToOnes?.user.joinColumns?.fieldName).toBe('user_slug2');
      expect(user.oneToOnes?.account.inverse).toBe('user_slug2');
    });
  });
});

describe('incrementJoinColumnIfNeeded', () => {
  describe('on conflict', () => {
    it('increments the join column', () => {
      expect(
        incrementJoinColumnIfNeeded('yo', {
          yo: true,
        })
      ).toBe('yo2');
    });

    it('handles already numbered columns', () => {
      expect(
        incrementJoinColumnIfNeeded('yo21', {
          yo21: true,
        })
      ).toBe('yo22');
    });

    it('returns same key if none', () => {
      expect(incrementJoinColumnIfNeeded('yo21', {})).toBe('yo21');
    });
  });
});
