import { padStart } from 'lodash';

import { LoggerService } from './logger.service';

/**
 * A simple Stopwatch class used to measure the elapsed time between two events
 */
export class Stopwatch {
  startTime: number;
  endTime: number;
  logIndent: number;

  constructor(private readonly logger: LoggerService) {
    this.start();
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.endTime = Date.now();
  }

  logElapsedTime(message?: string) {
    if (message) {
      this.logger.log(message);
    }

    this.logger.log(
      `time:  ${parseProcessingTime(this.endTime - this.startTime)}`,
    );
  }

  stopAndLogElapsedTime(message?: string) {
    this.stop();
    this.logElapsedTime(message);
  }
}

/**
 * Parse milliseconds to a human readable format
 *
 * @param {number} [duration=0] - number of milliseconds
 * @return {string} - formatted string ('00:00:00.000' -> 'hh:mm:ss.milliseconds')
 */
const parseProcessingTime = (duration: number = 0): string => {
  if (duration === 0) {
    return '00:00:00.000';
  }

  const milliseconds = Math.floor(duration % 1000);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(
    seconds.toString(),
    2,
    '0',
  )}.${padStart(milliseconds.toString(), 3, '0')}`;
};
