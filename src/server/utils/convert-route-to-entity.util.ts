const mapping: Record<string, string> = {
  'emergency-contacts': 'emergency_contact',
  locations: 'location',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
