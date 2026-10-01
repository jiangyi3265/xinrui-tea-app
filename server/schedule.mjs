// Daily grab / consignment windows and the money rules attached to them.
// Everything is evaluated in China Standard Time (UTC+8) regardless of the
// server timezone, because the operators configure clock times such as 09:30.
export const clock = { now: () => Date.now() };

export const scheduleDefaults = {
  grabStart: '09:30', grabEnd: '09:35',
  consignStart: '14:30', consignEnd: '17:30',
  grabLimit: 2, fuelRate: 2, profitRate: 1, consignUpliftRate: 3,
  registerDailyLimit: 300, // self-registrations accepted per day; 0 closes self-registration
};
const DAY = 86400000, OFFSET = 8 * 3600000;
const HM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const validHm = value => typeof value === 'string' && HM.test(value);
const minutes = value => { const m = HM.exec(value); return m ? Number(m[1]) * 60 + Number(m[2]) : null; };
export const dayStart = ts => Math.floor((ts + OFFSET) / DAY) * DAY - OFFSET;
export const dayKey = ts => new Date(ts + OFFSET).toISOString().slice(0, 10);

export function scheduleValid(v) {
  return validHm(v.grabStart) && validHm(v.grabEnd) && minutes(v.grabStart) < minutes(v.grabEnd)
    && validHm(v.consignStart) && validHm(v.consignEnd) && minutes(v.consignStart) < minutes(v.consignEnd)
    && Number.isSafeInteger(v.grabLimit) && v.grabLimit >= 1 && v.grabLimit <= 100
    && Number.isSafeInteger(v.registerDailyLimit) && v.registerDailyLimit >= 0 && v.registerDailyLimit <= 100000
    && [v.fuelRate, v.profitRate, v.consignUpliftRate].every(x => typeof x === 'number' && Number.isFinite(x) && x >= 0 && x <= 100);
}

export function windowOf(rules, kind, ts = clock.now()) {
  const base = dayStart(ts);
  return { start: base + minutes(rules[kind + 'Start']) * 60000, end: base + minutes(rules[kind + 'End']) * 60000 };
}
// 'before' = today's window has not opened, 'open', 'after' = already closed today.
export function phase(rules, kind, ts = clock.now()) {
  const w = windowOf(rules, kind, ts);
  return ts < w.start ? 'before' : ts <= w.end ? 'open' : 'after';
}

// Truncate (never round up) to whole cents: 1060.9 * 2% = 21.218 -> 21.21.
export const cents = value => Math.round(Number(value) * 100);
export const floorCents = value => Math.floor(Number(value) * 100 + 1e-6) / 100;
export const fuelFee = (price, rules) => floorCents(Number(price) * rules.fuelRate / 100);
export const profitFee = (price, rules) => floorCents(Number(price) * rules.profitRate / 100);
export const upliftPrice = (price, rules) => floorCents(Number(price) * (100 + rules.consignUpliftRate) / 100);

// Time object in the shape the recovered H5 "loot" page already understands.
export function lootTime(rules, soldOut, ts = clock.now()) {
  const w = windowOf(rules, 'grab', ts), p = phase(rules, 'grab', ts);
  const closed = p === 'after' || (p === 'open' && soldOut);
  const sec = ms => Math.floor(ms / 1000);
  return {
    new_time: sec(ts), start_time: sec(w.start), start_buy_time: sec(w.start), end_time: sec(w.end),
    start_end_time: rules.grabStart, start_end_time1: rules.grabEnd,
    status: closed ? 20 : 10, preview_minutes: 0,
    time: closed ? 0 : p === 'before' ? sec(w.start - ts) : sec(w.end - ts),
  };
}
