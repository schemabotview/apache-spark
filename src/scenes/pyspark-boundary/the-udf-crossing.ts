import type { Scene } from '@graphlearning/flow'

export const theUdfCrossing: Scene = {
  id: 'pyb-udf-crossing',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'driver',
      framed: true,
      label: 'The driver serialises it',
      pattern: 'service',
      icon: 'package',
      sub: 'cloudpickle takes the function AND its closure',
    },
    {
      id: 'exec',
      label: 'On every executor, the row now leaves the JVM',
      pattern: 'warn',
      sub: 'the Python process stops being idle — and the engine has no idea what your function does',
      cols: 2,
      children: [
        {
          id: 'e1',
          icon: 'server',
          label: 'Executor A',
          pattern: 'service',
          sub: 'a socket between the two',
          cols: 2,
          children: [
            { id: 'e1-jvm', label: 'JVM', pattern: 'network', sub: 'holds the rows' },
            { id: 'e1-py', label: 'Python worker', pattern: 'warn', sub: 'runs your function' },
          ],
        },
        {
          id: 'e2',
          icon: 'server',
          label: 'Executor B',
          pattern: 'service',
          sub: 'and again, here',
          cols: 2,
          children: [
            { id: 'e2-jvm', label: 'JVM', pattern: 'network', sub: 'holds the rows' },
            { id: 'e2-py', label: 'Python worker', pattern: 'warn', sub: 'runs your function' },
          ],
        },
      ],
    },
    {
      id: 'gotcha',
      framed: true,
      label: 'The closure gotcha',
      pattern: 'warn',
      sub: 'a UDF referencing a big local dict ships that dict to every task',
    },
  ],
  edges: [
    { source: 'driver', target: 'exec', label: 'shipped to every executor' },
    { source: 'exec', target: 'gotcha' },
  ],
}
