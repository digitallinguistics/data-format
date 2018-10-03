// IMPORTS
const { AJV } = require(`./utilities`);

// VARIABLES
let ajv;
let validate;

// VALID SAMPLE DATA
const timestampData = {
  annotationType: `timestamp`,
  notes:          [
    {
      text: `Points to door.`,
    },
  ],
  tags:           {
    gestureType: `point`,
  },
  ts: 12.345,
};

const timespanData = {
  annotationType: `timespan`,
  endTime:        67.871,
  notes:          [
    {
      text: `Speaker 2 was not present for this part of the text.`,
    },
  ],
  startTime: 12.345,
  tags:      {
    intonationContour: `sharpRise`,
  },
};

describe(`Annotation`, () => {

  beforeAll(async function setup() {
    ajv = await AJV();
    validate = d => ajv.validate(`Annotation`, d);
  });

  it(`validates: timestamp`, () => {
    const valid = validate(timestampData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

  it(`validates: timespan`, () => {
    const valid = validate(timespanData);
    if (valid) expect(valid).toBe(true);
    else fail(ajv.errorsText());
  });

});
