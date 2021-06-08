// data structures

const actionSample = {
  type: 'nav',
  data: {
    dest: {
      x:2, y:2
    }
  }
}

const controllableSample = {
  id: 'p1',
  // action data structure
  action: {
    type: 'nav',
    data: {
      dest: {
        x:2, y:2
      }
    }
  },
  isTeleable: true,
}

const stateSample = {
  // lists of diff major types of things
  mechanics: [
    {
      type: 'tele',
      teleIn: {
        x:1, y:1,
      },
      // ...
    }
  ],
  controllables: [
    {
      // ...
    }
  ],
  env: {
    // env of the pzle curr state
  }
}


// pzle: puzzle
const pzleSampleV1 = {
  pathV1: {
    state: {
      // ...
    },
    nextSteps: [
      {
        controllableActions: [
          // it can be N controllables do diff actions to results in this next step
          {
            controllable: c1,
            action: a1,
          },
          // ...
        ],
        nextStep: {
          state: {
            // ...
          },
          nextSteps: [
            {
              // some next step are purely mechanics auto executed, their controllableActions will be empty arr. nextSteps in such case should also have 1 item only.
              controllableActions: [],
              nextStep: {
                // ...
              }
            }
            // ...
          ]
        }
      },
      // ...
    ]
  },

  reversedPathV1: {
    // from end state to start state. this is obj that will be generated in [ generating sol from end state ]. forward version should can be generated from this
    state: {
      // ...
    },
    prevSteps: [
      {
        controllableActions: [
          // it can be N controllables do diff actions to results in this next step
          {
            controllable: c1,
            action: a1,
          },
          // ...
        ],
        prevStep: {
          state: {},
          prevSteps: []
        }
      }
    ]
  },

  startState: {
    // a state obj.
    // used for telling unty/... how the pzle is, wt pzle to create at gm start
  },
}

