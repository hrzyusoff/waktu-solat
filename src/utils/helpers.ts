import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

// Function to get current time
export const currentTime = () => {
  const time = new Date();
  return time.getHours() + ':' + time.getMinutes();
};

// Function to get current date
export const currentDate = (date: Date) => {
  return dayjs(date, 'HH:mm');
};

// Function to calculate time duration
export const timeDuration = (currentTime: string, prayerTime: string) => {
  const currentHourCT = parseInt(currentTime.split(':')[0]);
  const currentHourPT = parseInt(prayerTime.split(':')[0]);
  const currentMinuteCT = parseInt(currentTime.split(':')[1]);
  const currentMinutePT = parseInt(prayerTime.split(':')[1]);

  const ct = dayjs.duration({
    hours: currentHourCT,
    minutes: currentMinuteCT,
  });

  const pt = dayjs.duration({
    hours: currentHourPT,
    minutes: currentMinutePT,
  });

  // TODO: Refactor and fix negative value
  if (pt.subtract(ct).hours() === 0) {
    return pt.subtract(ct).minutes() + ' minit ';
  } else if (pt.subtract(ct).minutes() === 0) {
    return pt.subtract(ct).hours() + ' jam ';
  } else if (pt.subtract(ct).hours() === 0 && pt.subtract(ct).minutes() === 0) {
    return 'Telah masuk waktu untuk solat';
  }

  return pt.subtract(ct).hours() + ' jam ' + pt.subtract(ct).minutes() + ' minit ';
};
