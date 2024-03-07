//guard
type Guard = 'Auth' | 'Guest' | 'All'

type Permission = {
  guard: Guard
  permission: string[]
}

type RolePermission = {
  [x: string]: Permission
}
