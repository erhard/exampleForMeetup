//this file encapsulates all interfaces the the cloud provider at one place
//The idea is to change only this  interface if You want to change the cloud
//provider

//Standard :

//Independand of the provider the return object is :
//{
//    status:  "error" || "ok"
//    payload: "object || "{"text" : "errortext"}
//}

//in case of create , update
//in case of delete ({status }  only)
//in case of list the original from AWS at the moment

//export interface returnObject {
//  status: string;
//  payload: any;
//}

import Amplify from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import awsconfig from 'src/aws-exports';
import EventBus from 'src/services/eventBus';
import { strip } from 'src/services/functions';

export const configCloud = () => {
  Amplify.configure(awsconfig);
  Auth.configure(awsconfig);
};

export const signUp = async (email, password) => {
  try {
    EventBus.$emit('SPINNER_ON');
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: { email: email }
    });
    EventBus.$emit('SPINNER_OFF');
    if (user) {
      return { status: 'ok', payload: { user: user } };
    }
    console.log('signedInUser');
    console.log(user);
  } catch (err) {
    console.log(err);
    EventBus.$emit('SPINNER_OFF');
    return { status: 'error', payload: { message: err.message } };
  }
};

export const confirmSignUp = async (username, code) => {
  let result;
  try {
    EventBus.$emit('SPINNER_ON');
    await Auth.confirmSignUp(username, strip(code));
    console.log('checkSignUp');
    EventBus.$emit('SPINNER_OFF');
    return { status: 'ok', payload: {} };
  } catch (err) {
    EventBus.$emit('SPINNER_OFF');
    //the user is only interesed in codemismatch error//
    if (result.code == 'CodeMismatchException') {
      console.log('error confirming sign up', err);
      return {
        status: 'error',
        payload: { code: err.code, message: err.message }
      };
    } else {
      //some other error not concerning the user like problems with the admin email
      return { status: 'ok', payload: {} };
    }
  }
};

export const auth_restore_session = async () => {
  try {
    //await Auth.currenSession();
    EventBus.$emit('SPINNER_ON');
    const currentUser = await Auth.currentAuthenticatedUser();
    let userGroups = currentUser.signInUserSession.accessToken.payload['cognito:groups'] || [];
    const isAdmin = userGroups.includes("admin")
    EventBus.$emit('SPINNER_OFF');
    if (currentUser) {
      return {
        status: 'ok', payload: {
          email: currentUser.username,
          isAdmin: isAdmin,
          groups: userGroups
        }
      };
    } else {
      return { status: 'error', payload: {} };
    }
  } catch (err) {
    EventBus.$emit('SPINNER_OFF');
    console.log('Error');
    console.log(err);
    return { status: 'error', payload: {} };
  }
};









//accessGroup may be contain "admin"
export const auth_login = async (username, password) => {
  try {
    EventBus.$emit('SPINNER_ON');
    let user = await Auth.signIn(username, password);
    console.log("--------Fallunterscheidung rein")
    console.log(user);
    console.log(user["challengeName"]);
    console.log("-------------")
    if (user) {
      if (user["challengeName"] && user["challengeName"] == "NEW_PASSWORD_REQUIRED") { 
        return { status: 'ok', payload: {action: "setNewPWD", technicalUserObject: user}}
      }  
      let userGroups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
      const isAdmin = userGroups.includes("admin")
      EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
      //technicalUserObject is needed for other Amplify Auth actions as input
      return {
        status: 'ok',
        payload: {
          user: user.username,
          email: user.username,
          accessGroups: userGroups,
          isAdmin: isAdmin,
          technicalUserObject: user
        }
      };
    }
    EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
  } catch (error) {
    EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
    console.log('error login', error);
    return { status: 'error', payload: { message: error.message } };
  }
};

export const getCodeforForgottenPassword = async mail => {
  try {
    EventBus.$emit('SPINNER_ON');
    const result = await Auth.forgotPassword(mail);
    EventBus.$emit('SPINNER_OFF');
    return { status: 'ok', payload: {} };
  } catch (error) {
    EventBus.$emit('SPINNER_OFF');
    return { status: 'error', payload: { message: error.code } };
  }
};

export const resetPassword = async (email, password, code) => {
  try {
    EventBus.$emit('SPINNER_ON');
    const result = await Auth.forgotPasswordSubmit(email, code, password);
    EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
    return { status: 'ok', payload: {} };
  } catch (error) {
    EventBus.$emit('SPINNER_OFF');
    return { status: 'error', payload: { message: error.message } };
  }
};

export const auth_logout = async () => {
  try {
    EventBus.$emit('SPINNER_ON');
    console.log(await Auth.signOut());
    const result = await Auth.currentUserInfo();
    EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
    if (result) {
      return { status: 'ok', payload: {} };
    }
  } catch (error) {
    EventBus.$emit('SPINNER_OFF', { minWaitTime: 2000 });
    return { status: 'error', payload: {} };
  }
};


export const getForcedPWD = async (user, newpwd) => {
  const result = await Auth.completeNewPassword(user, newpwd)
  return result;
}
