// NavigationService.js

import {
  NavigationActions,
  NavigationContainerComponent
} from "react-navigation";

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: any, params: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function idempotentNavigate(routeName: any, params: any = {}, key: any) {
  _navigator!.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      key
    })
  );
}
function back() {
  _navigator!.dispatch(NavigationActions.back({}));
}

export default {
  navigate,
  idempotentNavigate,
  setTopLevelNavigator,
  back
};
