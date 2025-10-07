import type { NavigationGuardNext, RouteLocation } from "vue-router";

type GuardCondition = (to: RouteLocation, from: RouteLocation) => boolean;

export default function createRouteGuard(
  condition: GuardCondition,
  redirectTo: { name: string },
  publicRoutes?: string[]
) {
  return (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
    if (publicRoutes && publicRoutes.includes(to.name as string)) {
      return next();
    }
    return condition(to, from) ? next() : next(redirectTo);
  };
}
