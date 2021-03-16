import awsconfig from '../aws-exports';
import Amplify from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

export const configCloud = () => {
    Amplify.configure(awsconfig);
    Auth.configure(awsconfig);
  };

  export const auth_logout = async () => {
    try {
    //  EventBus.$emit('SPINNER_ON');
      console.log(await Auth.signOut());
      const result = await Auth.currentUserInfo();
      EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
      if (result) {
        return { status: 'ok', payload: {} };
      }
    } catch (error) {
     // EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
      return { status: 'error', payload: {} };
    }
  };