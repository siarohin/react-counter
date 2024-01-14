import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { CounterComponent } from './Counter';
import { TIMER_INTERVAL } from './constants';

jest.useFakeTimers();
const INPUT_VALUE = 30;

describe('CounterComponent', () => {
  it('should render', async () => {
    render(<CounterComponent />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Enter a number/i)).toHaveAttribute('type', 'number');
    });

    await waitFor(() => {
      expect(screen.getByText(/start/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/reset/i)).toBeInTheDocument();
    });
  });

  it('should update count value on input changes', async () => {
    render(<CounterComponent />);

    const input = screen.getByLabelText(/enter a number/i);
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe(INPUT_VALUE.toString());
    });
  });

  it('should start and stop the count', async () => {
    render(<CounterComponent />);
    const startStopButton = screen.getByText(/start/i);
    const input = screen.getByLabelText(/enter a number/i);
    const expected = INPUT_VALUE - TIMER_INTERVAL/1000;

    fireEvent.change(input, { target: { value: INPUT_VALUE } });
    fireEvent.click(startStopButton);

    await waitFor(() => {
      expect(startStopButton.textContent).toBe('Stop');
    });

    act(() => {
      jest.advanceTimersByTime(TIMER_INTERVAL);
    });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe(expected.toString());
    });

    fireEvent.click(startStopButton);

    await waitFor(() => {
      expect(startStopButton.textContent).toBe('Start');
    });

    act(() => {
      jest.advanceTimersByTime(TIMER_INTERVAL);
    });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe(expected.toString());
    });
  });

  it('should reset the count', async () => {
    render(<CounterComponent />);
    const resetButton = screen.getByText(/reset/i);
    const input = screen.getByLabelText(/enter a number/i);

    fireEvent.change(input, { target: { value: INPUT_VALUE } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });
});