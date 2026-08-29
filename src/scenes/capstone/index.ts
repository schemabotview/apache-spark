import type { Scene } from '../../render-engine'
import { lambdaArch } from './lambda-arch'
import { capstoneCodeScenes } from './code-scenes'

// The capstone course's scenes: the `lambda-arch` master map (the two bookends — the-plan & closer)
// plus one per-stage CODE scene for each of the 11 build sections (left = the stage's code card).
export const capstoneScenes: Scene[] = [lambdaArch, ...capstoneCodeScenes]
