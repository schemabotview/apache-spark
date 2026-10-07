import type { Section } from '../types'

export const sparkSession: Section = {
  id: 'sparksession',
  title: 'SparkSession and the lifecycle',
  scene: 'session-lifecycle',
  focus: 'one',
  slide: `## SparkSession and the lifecycle

\`SparkSession\` is the entry point — the object that owns the connection to the cluster and every API you will use.

### Creating it
- \`SparkSession.builder\` … \`.getOrCreate()\` — name it, configure it, build it
- Most configuration is set **here**, before anything runs
- In a notebook or \`spark-submit\`, one is often made for you already

### \`getOrCreate\` is the trap worth knowing
- It returns the **existing** session if one exists — your new \`.config(...)\` is silently ignored
- The single most common "my setting did nothing" bug in Spark
- Restart the session, or set the value where it is read **per query**

### The four steps every application walks
- **Create** the session → **describe** the work → an action **executes** it → **stop**
- \`stop()\` releases the executors. Until then you are holding the cluster`,
  narration:
    'Everything we have just described is reachable from one object in your code: the SparkSession. It is the entry point. It owns the connection to the cluster, and every API you will use — reading files, SQL, DataFrames, configuration — hangs off it. You build it with a builder, as in the code here: give it an application name, which is what you will look for in the Spark UI later, set whatever configuration you need, and call getOrCreate. A couple of things about that. First, most configuration is set right here, before anything runs, because a lot of it is read once at startup and changing it later does nothing. Second, you often will not write this at all — a notebook or spark-submit usually makes a session for you and hands it over as a variable called spark. Now, getOrCreate deserves a warning, because it hides a genuine trap. Read the name literally: get, or create. If a session already exists in this process, it returns that existing one and quietly ignores everything you just configured. So you change a setting, you re-run the cell, nothing changes, and there is no error and no warning anywhere. That is the single most common my-setting-did-nothing bug in Spark, and when you hit it the fix is either to restart the session properly, or to set the value somewhere it is read per query rather than at startup. With the session in hand, every application walks the same four steps. You create the session. You describe the work you want — and we will see shortly that describing is all that happens. An action executes it. And finally you stop. That stop matters more than it looks: calling stop releases the executors back to the cluster manager. Until you call it, or until the process exits, you are holding that whole allocation whether you are using it or not, and on a shared cluster someone else is waiting for it. So that is the lifecycle. Now let us look at what actually happens when that third step fires, and the three words you will spend the rest of your career reading off the Spark UI.',
}
