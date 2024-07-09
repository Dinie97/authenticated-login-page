"use client";

import type { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/app/GlobalRedux/Features/counter/counterSlice";

export default function User() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Increment By Amount
      </button>
    </main>
  );
}
