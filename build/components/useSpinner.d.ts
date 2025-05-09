import { type SpinnerName } from 'cli-spinners';
export type UseSpinnerProps = {
    /**
     * Type of a spinner.
     * See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.
     *
     * @default dots
     */
    type?: SpinnerName;
    speed?: number;
};
export type UseSpinnerResult = {
    frame: string;
};
export declare function useSpinner({ type, speed }: UseSpinnerProps): UseSpinnerResult;
