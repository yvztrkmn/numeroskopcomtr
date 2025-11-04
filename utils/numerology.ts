/**
 * A mapping of letters to their Pythagorean numerology values.
 */
const letterValues: { [key: string]: number } = {
  'a': 1, 'j': 1, 's': 1, 'ş': 1,
  'b': 2, 'k': 2, 't': 2,
  'c': 3, 'ç': 3, 'l': 3, 'u': 3, 'ü': 3,
  'd': 4, 'm': 4, 'v': 4,
  'e': 5, 'n': 5, 'w': 5,
  'f': 6, 'o': 6, 'ö': 6, 'x': 6,
  'g': 7, 'ğ': 7, 'p': 7, 'y': 7,
  'h': 8, 'q': 8, 'z': 8,
  'ı': 9, 'i': 9, 'r': 9,
};

const vowels = "aeıioöuü";

/**
 * Normalizes a name by converting to lowercase and removing non-alphabetic characters.
 * @param name The name string.
 * @returns A normalized string.
 */
const normalizeName = (name: string): string => {
    return name.toLowerCase().replace(/[^a-zçğıöşü]/g, '');
};

const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduces a number to a single digit (1-9) or a master number.
 * @param num The number to reduce.
 * @param final Should the number always be reduced to a single digit?
 * @returns The reduced single-digit number or master number.
 */
export const reduceNumber = (num: number, final: boolean = false): number => {
  if (!final && MASTER_NUMBERS.includes(num)) {
    return num;
  }
  let sum = num
    .toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);

  if (sum > 9 && (final || !MASTER_NUMBERS.includes(sum))) {
    return reduceNumber(sum, final);
  }

  return sum;
};

/**
 * Calculates a numerology number from a name string based on specified letters.
 * @param name The full name.
 * @param letterSet A string containing the letters to sum (e.g., 'aeiou' for vowels).
 * @returns The calculated and reduced numerology number.
 */
const calculateNameNumber = (name: string, filter: 'all' | 'vowels' | 'consonants'): number => {
    const normalized = normalizeName(name);
    let total = 0;
    for (const char of normalized) {
        const isVowel = vowels.includes(char);
        if (
            filter === 'all' ||
            (filter === 'vowels' && isVowel) ||
            (filter === 'consonants' && !isVowel)
        ) {
            total += letterValues[char] || 0;
        }
    }
    return reduceNumber(total);
};


/**
 * Calculates the Destiny Number from a full name.
 * @param name The full name.
 * @returns The Destiny Number.
 */
export const getDestinyNumber = (name: string): number => calculateNameNumber(name, 'all');

/**
 * Calculates the Soul Urge Number from the vowels in a full name.
 * @param name The full name.
 * @returns The Soul Urge Number.
 */
export const getSoulUrgeNumber = (name: string): number => calculateNameNumber(name, 'vowels');

/**
 * Calculates the Personality Number from the consonants in a full name.
 * @param name The full name.
 * @returns The Personality Number.
 */
export const getPersonalityNumber = (name: string): number => calculateNameNumber(name, 'consonants');

/**
 * Generates a character chart counting the frequency of each number in a name.
 * @param name The full name.
 * @returns An object with counts for numbers 1-9.
 */
export const getCharacterChart = (name: string): { [key: string]: number } => {
    const chart: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 };
    const normalized = normalizeName(name);
    for (const char of normalized) {
        const value = letterValues[char];
        if (value) {
            chart[value.toString()]++;
        }
    }
    return chart;
};


/**
 * Calculates the numerology number for a given date.
 * @param date The date to calculate the number for.
 * @returns The numerology number for the date.
 */
export const getUniversalDayNumber = (date: Date): number => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const year = date.getFullYear();

  const dayReduced = reduceNumber(day, true);
  const monthReduced = reduceNumber(month, true);
  const yearReduced = reduceNumber(year, true);

  return reduceNumber(dayReduced + monthReduced + yearReduced, true);
};

/**
 * Calculates the Life Path Number from a date of birth string (DD.MM.YYYY).
 * @param dob The date of birth string.
 * @returns The calculated Life Path Number.
 */
export const getLifePathNumber = (dob: string): number => {
    const parts = dob.split('.').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        return 0; // Invalid format
    }
    const [day, month, year] = parts;
    const dayReduced = reduceNumber(day);
    const monthReduced = reduceNumber(month);
    const yearReduced = reduceNumber(year);
    return reduceNumber(dayReduced + monthReduced + yearReduced);
};

/**
 * Calculates the Personal Year Number for a given date of birth and year.
 * @param dob The date of birth (DD.MM.YYYY).
 * @param targetYear The year for which to calculate the personal year.
 * @returns The Personal Year Number.
 */
export const getPersonalYearNumber = (dob: string, targetYear: number): { personalYear: number, breakdown: { number: number, type: string }[] } => {
    const parts = dob.split('.').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        return { personalYear: 0, breakdown: [] };
    }
    const [day, month] = parts;
    const dayReduced = reduceNumber(day, true);
    const monthReduced = reduceNumber(month, true);
    const yearReduced = reduceNumber(targetYear, true);
    
    const breakdown = [
        { number: dayReduced, type: 'Doğum Günü' },
        { number: monthReduced, type: 'Doğum Ayı' },
        { number: yearReduced, type: 'Evrensel Yıl' }
    ];

    return {
        personalYear: reduceNumber(dayReduced + monthReduced + yearReduced, true),
        breakdown
    };
};


/**
 * Calculates the Personal Day Number for a user on a given date.
 * @param lifePathNumber The user's life path number.
 * @param date The date for the calculation.
 * @returns The calculated Personal Day Number.
 */
export const getPersonalDayNumber = (lifePathNumber: number, date: Date): number => {
    const universalDayNumber = getUniversalDayNumber(date);
    return reduceNumber(lifePathNumber + universalDayNumber, true);
};


/**
 * Converts a date string from YYYY-MM-DD format to DD.MM.YYYY format.
 * @param dateString The date string in YYYY-MM-DD format.
 * @returns The date string in DD.MM.YYYY format, or an empty string if input is invalid.
 */
export const formatDateForApi = (dateString: string): string => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
};