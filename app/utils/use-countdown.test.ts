import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useCountdown } from "./use-countdown";

describe("useCountdown", () => {
  it("should initialize with the given initial time", () => {
    const { result } = renderHook(() => useCountdown(60));
    expect(result.current.time).toBe(60);
    expect(result.current.formattedTime).toBe("1:00");
  });

  it("should start and decrement the timer when toggleTimer is called", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCountdown(60));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(59);
    expect(result.current.formattedTime).toBe("0:59");

    jest.useRealTimers();
  });

  it("should stop the timer when toggleTimer is called again", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCountdown(60));

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(59);
    expect(result.current.formattedTime).toBe("0:59");

    jest.useRealTimers();
  });
});
