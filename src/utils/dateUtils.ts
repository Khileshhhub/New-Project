export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isWithinOperatingHours = (time: string): boolean => {
  const [hours] = time.split(':').map(Number);
  return hours >= 4 && hours <= 23; // Railway operating hours: 4 AM to 11 PM
};