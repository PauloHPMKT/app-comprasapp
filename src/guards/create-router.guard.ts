import type { NavigationGuardNext, RouteLocation } from "vue-router";

type GuardCondition = (to: RouteLocation, from: RouteLocation) => boolean;

export default function createRouteGuard(condition: GuardCondition, redirectTo: { name: string }) {
  return (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
    if (!condition(to, from)) {
      return next(redirectTo);
    }
    return next();
  };
}
