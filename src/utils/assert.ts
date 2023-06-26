// https://stackoverflow.com/questions/67785257/best-practice-when-asserting-non-null-on-a-value-coming-from-react-usecontext-o
import { useAuth } from '@/hooks/auth';
import { User } from '@/types';

function assertAuthenticated(
  user: ReturnType<typeof useAuth>['user']
): asserts user is User {
  if (!user) {
    throw new Error('User is not authenticated, please log in!');
  }
}

export { assertAuthenticated };
