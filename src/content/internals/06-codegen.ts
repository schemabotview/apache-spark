import type { Section } from '../types'

export const codegenSection: Section = {
  id: 'codegen',
  title: 'Whole-stage code generation',
  scene: 'codegen',
  focus: 'win',
  slide: `## Whole-stage code generation

The fourth phase, and the one that makes Spark competitive with hand-written code.

### The problem it solves
- Classically each operator is an object with a \`next()\` method, pulling rows from the one below
- Three operators means **three virtual calls per row** — and each call does almost nothing
- On a billion rows the call overhead dwarfs the actual work

### What Spark does instead
- It takes every operator between two shuffles and **generates one Java function** for all of them
- No virtual calls, and the row stays in CPU registers across all three steps

### How you see it in a plan
- The \`*(1)\`, \`*(2)\` markers are the fused stages — the star means "this got code-generated"
- **No star is a warning sign.** Usually a UDF, and usually the reason the stage is slow`,
  narration:
    'This is the fourth Catalyst phase, and it is the one that sounds most unlikely when you first hear it: Spark writes Java code, at runtime, compiles it, and runs that. Let me explain the problem it solves first, because then the solution is obvious. Classically, a query engine is built from operator objects. Each operator has a next method and pulls rows from the operator below it. A scan, a filter, a projection — three objects, chained. To get one row through all three, you make three method calls, and each one is a virtual call, which the JVM cannot inline well because the call target varies. Now consider what those methods actually do: the filter compares one number; the projection copies one field. The work is a handful of CPU instructions, and the overhead of calling it is comparable or larger. On a billion rows, you are spending most of your time on the machinery of calling functions rather than on the query. So Spark does something different. It takes every operator between two shuffle boundaries — the whole stage — and generates a single Java function that does all of their work inline. Look at the generated code on the board. It is one while loop over the input rows, with the filter as an if-statement inside it and the projection as a write. No operator objects, no virtual calls, one loop. That function is compiled at runtime by a real Java compiler and executed, so it gets the JIT\'s full attention. Two wins come out of this, and the second is the one people never hear about. The obvious one is that the virtual calls are gone. The subtler one is that because all three operations happen inside one loop body, the row can stay in CPU registers across all of them instead of being written back to memory between each operator. That is a large effect at scale. This is what the Spark papers meant when they said hand-written code performance: the generated loop looks very much like what you would write by hand if you were writing this one query in Java and nothing else. And here is how you see it in a plan, which is immediately practical. In a physical plan you will see markers like star-bracket-one and star-bracket-two attached to operators. The star means this operator was code-generated, and the number tells you which fused stage it belongs to — operators sharing a number were compiled into the same function. Now the useful part: an operator with no star did not get code-generated. That is a warning sign worth looking for, because it means Spark had to fall back to the slow path, and the most common reason is a Python UDF sitting in the middle of your stage, breaking the fusion in half. Next: the boundary that whole-stage codegen cannot cross.',
}
