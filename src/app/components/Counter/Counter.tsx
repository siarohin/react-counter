import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MIN_TIMER_VALUE, TIMER_INTERVAL } from './constants';
import './Counter.scss';

export const CounterComponent = () => {
  const [count, setCount]: [number, Dispatch<SetStateAction<number>>] = useState(MIN_TIMER_VALUE);
  const [isCounting, setIsCounting]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const isButtonsDisabled: boolean = count === MIN_TIMER_VALUE;

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (isCounting && count > MIN_TIMER_VALUE) {
      intervalId = setInterval((): void => {
        setCount((value: number): number => (value > MIN_TIMER_VALUE ? value - 1 : MIN_TIMER_VALUE));
      }, TIMER_INTERVAL);
    }

    if (count === MIN_TIMER_VALUE) {
      setIsCounting(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [count, isCounting]);

  const handleInputChange = (event: ChangeEvent): void => {
    const value: number = parseInt((event.target as HTMLInputElement).value, 10);
    setCount(value > MIN_TIMER_VALUE ? value : MIN_TIMER_VALUE);
  };

  const handleStartStopClick = (): void => {
    setIsCounting((value: boolean) => !value);
  };

  const handleResetClick = (): void => {
    setIsCounting(false);
    setCount(0);
  };

  return (
    <div className="counter">
      <TextField id="count"
                 className="control"
                 label="Enter a number"
                 variant="outlined"
                 type="number"
                 value={count === MIN_TIMER_VALUE ? '' : count}
                 onFocus={(e) => e.target.value = ""}
                 onChange={handleInputChange}
                 disabled={isCounting}
                 autoFocus />
      <div className="action">
        <Button variant="contained"
                onClick={handleStartStopClick}
                disabled={isButtonsDisabled}>
          {isCounting ? 'Stop' : 'Start'}
        </Button>
        <Button variant="outlined"
                onClick={handleResetClick}
                disabled={isButtonsDisabled}>
          Reset
        </Button>
      </div>
      <Typography className="value"
                  variant="h1"
                  component="h2">
        {count}
      </Typography>
    </div>
  );
};