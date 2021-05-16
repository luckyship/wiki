// Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.

// For example:

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}


type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never} | NodeB | {type: 'C', name: never} // would replace name to never

type ReplaceKeys<U, T, Y> = {
  [k in keyof U]: k extends T ? k extends keyof Y ? Y[k]: never : U[k]
}

/*
ReplaceKeys<NodeA | NodeB | NodeC, 'name' | 'flag', {name: number, flag: string}>
=> {
  type: 'type' extends 'name' | 'flag' ? ... => NodeA[type],
  name: 'name' extends 'name' | 'flag' ? ... => {name: number, flag: string}['name'],
  flag: 'flag' extends 'name' | 'flag' ? ... => {name: number, flag: string}['flag'],
} | ...
*/

