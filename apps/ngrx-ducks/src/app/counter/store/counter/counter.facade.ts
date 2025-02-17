import {
  createDuck,
  dispatch,
  getReducer,
  StoreChunk,
  useActions,
  useSelect,
  useSelectors
} from '@ngrx-ducks/core';
import { counterFeatureName, State } from '../counter.feature';
import * as selectors from './counter-immutable.selectors';
import { CounterState } from './counter.state';

const initialState = {
  count: 0,
  isLoading: true
};

@StoreChunk<State>({
  feature: counterFeatureName,
  slice: 'counterImmutable',
  defaults: initialState
})
export class CounterFacade {
  static actions = useActions(CounterFacade);
  static reducer = getReducer(initialState, CounterFacade);

  pick = useSelect();
  select = useSelectors(selectors);

  /**
   *
   * You can also create aliases or build selector groups
   *
   * progress = bindSelectors({ isLoading: selectors.isLoading });
   * counter = bindSelectors({ count: selectors.currentCount });
   *
   */

  readonly loadCount = createDuck('[Counter] Load Count', dispatch<number>());

  increment = createDuck(
    '[Counter] Increment value',
    (state: CounterState, payload: number) => {
      return {
        ...state,
        count: state.count + payload
      };
    }
  );

  decrement = createDuck(
    '[Counter] Decrement value',
    (state: CounterState, payload: number) => {
      return {
        ...state,
        count: state.count - payload
      };
    }
  );

  override = createDuck(
    '[Counter] Set value',
    (state: CounterState, payload: number) => {
      return {
        ...state,
        count: payload,
        isLoading: false
      };
    }
  );

  math = {
    square: createDuck('[Counter] Square', (state: CounterState) => {
      return state;
    })
  };
}
