import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';

export const useIsAuth = ():void => {
  const [{data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if(!fetching && !data?.me){
      router.push('/login?next=' + router.pathname);
    }
  }, [fetching, data, router]);
};
