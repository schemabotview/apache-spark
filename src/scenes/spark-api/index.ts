import type { Scene } from '../../render-engine'
import { apiStack } from './api-stack'
import { apiRdd } from './api-rdd'
import { apiStructured } from './api-structured'
import { apiEngine } from './api-engine'
import { catalyst } from './catalyst'

// The spark-api course's scenes. `api-stack` is the shared spine (the altitude stack) — the focused
// band scenes (api-rdd · api-structured · api-engine) and the shared `catalyst` pipeline are added
// as each sub-slice is authored and reviewed.
export const sparkApiScenes: Scene[] = [apiStack, apiRdd, apiStructured, apiEngine, catalyst]
