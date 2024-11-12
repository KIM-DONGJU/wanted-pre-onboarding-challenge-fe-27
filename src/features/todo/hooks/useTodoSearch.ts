import { useReducer, useCallback } from "react";

import { GetTodosParams, Order, Priority, Sort } from "../types/todoTypes";

const SET_TYPE = {
  SORT: "SET_SORT",
  ORDER: "SET_ORDER",
  PRIORITY: "SET_PRIORITY",
  KEYWORD: "SET_KEYWORD",
  COUNT_ONLY: "SET_COUNT_ONLY",
} as const;


type PayloadMap = {
  [SET_TYPE.SORT]: Sort;
  [SET_TYPE.ORDER]: Order;
  [SET_TYPE.PRIORITY]: Priority | undefined;
  [SET_TYPE.KEYWORD]: string;
  [SET_TYPE.COUNT_ONLY]: boolean;
};

type SearchAction = {
  [K in keyof PayloadMap]: { type: K; payload: PayloadMap[K] }
}[keyof PayloadMap];

const initialState: GetTodosParams = {
  sort: undefined,
  order: "asc",
  priorityFilter: undefined,
  keyword: "",
  countOnly: false,
};

const searchReducer = (state: GetTodosParams, action: SearchAction) => {
  switch (action.type) {
    case SET_TYPE.SORT:
      return { ...state, sort: action.payload };
    case SET_TYPE.ORDER:
      return { ...state, order: action.payload };
    case SET_TYPE.PRIORITY:
      return { ...state, priorityFilter: action.payload };
    case SET_TYPE.KEYWORD:
      return { ...state, keyword: action.payload };
    case SET_TYPE.COUNT_ONLY:
      return { ...state, countOnly: !state.countOnly };
    default:
      return state;
  }
}

export function useTodoSearch() {
  const [searchState, dispatch] = useReducer(searchReducer, initialState);

  const setSort = useCallback((sort: Sort) => dispatch({ type: SET_TYPE.SORT, payload: sort }), [dispatch]);
  const setOrder = useCallback((order: Order) => dispatch({ type: SET_TYPE.ORDER, payload: order }), [dispatch]);
  const setPriorityFilter = useCallback(
    (priority?: Priority) => dispatch({ type: SET_TYPE.PRIORITY, payload: priority }),
    [dispatch]
  );
  const setKeyword = useCallback((keyword: string) => dispatch({ type: SET_TYPE.KEYWORD, payload: keyword }), [dispatch]);
  const toggleCountOnly = useCallback((countOnly: boolean) => dispatch({ type: SET_TYPE.COUNT_ONLY, payload: countOnly }), []);

  return {
    searchState,
    setSort,
    setOrder,
    setPriorityFilter,
    setKeyword,
    toggleCountOnly,
  };
}