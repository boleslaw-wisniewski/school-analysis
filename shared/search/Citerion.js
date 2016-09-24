'use strict';

class Criterion {
  constructor(type, some, every, range) {
    this.type = type;
    this.some = some;
    this.every = every;
    this.range = range;

    this.withinRange = (entry) => range.start <= entry && entry <= range.end;
  }

  filter(entry) {

    const equalsFn = v => Array.isArray(entry) ? entry.some(e => e === v) : v === entry;
    if (this.some !== undefined) {
      return this.some.some(equalsFn)
    }
    if (this.every !== undefined) {
      return this.every.every(equalsFn)
    }
    if (this.withinRange !== undefined){
      return Array.isArray(entry) ? entry.every(e => this.withinRange(e)) : this.withinRange(entry);
    }

    return true;
  }
}

Criterion.Some = function(type, values) {
  const some = Array.isArray(values) ? values : values !== undefined ? [values] : undefined;
  return new Criterion(type, some, undefined, undefined);
};
Criterion.Every = function(type, values) {
  const every = Array.isArray(values) ? values : values !== undefined ? [values] : undefined;
  return new Criterion(type, undefined, every, undefined);
};
Criterion.Range = function(type, range) {
  return new Criterion(type, undefined, undefined, range);
};

export default Criterion;
