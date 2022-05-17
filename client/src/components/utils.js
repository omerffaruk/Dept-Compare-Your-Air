function calculateTimeDifferenceInAnEasyToReadFormat(timeArray) {
  let nowMs = Date.now();
  let latestInMs = nowMs;
  timeArray.forEach((lastUpdate) => {
    let msBetweenNowAndLastUpdated = nowMs - Date.parse(lastUpdate);
    if (msBetweenNowAndLastUpdated < latestInMs) {
      latestInMs = msBetweenNowAndLastUpdated;
    }
  });
  let latestInMinutes = Math.round(latestInMs / 60000);
  let latestInHours = Math.round(latestInMs / 3600000);
  let latestInDays = Math.round(latestInMs / 86400000);
  let latestInWeeks = Math.round(latestInMs / 604800000);
  let latestInMonths = Math.round(latestInMs / 2629800000);
  let latestInYears = Math.round(latestInMs / 31557600000);
  let latestInString = "";
  if (latestInMinutes < 60) {
    latestInString = `${latestInMinutes} minutes`;
  } else if (latestInHours < 24) {
    latestInString = `${latestInHours} hours`;
  } else if (latestInDays < 7) {
    latestInString = `${latestInDays} days`;
  } else if (latestInWeeks < 4) {
    latestInString = `${latestInWeeks} weeks`;
  } else if (latestInMonths < 12) {
    latestInString = `${latestInMonths} months`;
  } else {
    latestInString = `${latestInYears} years`;
  }
  return latestInString.toUpperCase();
}

export { calculateTimeDifferenceInAnEasyToReadFormat };
