import { State, Todo } from './state';
import {
  actionDef,
  makeActionCreators,
  makeActionTypes,
  ReturnTypes,
  UnionOf,
} from '@/lib/action-helper';

const actions = {
  ['todo/add']: actionDef<{ text: string }>(),
  ['todo/toggle']: actionDef<{ id: string }>(),
  ['todo/remove']: actionDef<{ id: string }>(),
  ['todo/edit']: actionDef<{ id: string; text: string }>(),
  ['todo/clear-completed']: actionDef<null>(),
  ['todo/reorder']: actionDef<{ sourceIndex: number; destinationIndex: number }>(),
  ['filter/set']: actionDef<{ filter: State['filter'] }>(),
  ['todo/add-async']: actionDef<{ text: string }>(),
  ['eff/todo-add-ready']: actionDef<State>(),
} as const;

/* Action Types */
export const AT = makeActionTypes(actions);

/* Action Creators */
export const AC = makeActionCreators(actions);

export type Action = UnionOf<ReturnTypes<typeof AC>>;
