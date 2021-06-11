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
  pos: {
    x:2, y:2
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
    // any env that may change should be placed here?
    dimension: {
      x: 40,
      y: 40,
      // xMin: -10,
      // xMax: 10,
      // yMin: -10,
      // yMax: 10,
    }
  }
}

const stepSampleV3 = {
  state: {}, // state s1
  nextSteps: [
    {
      // if controllables do such actions in state s1, will results in state s2. at s1, there needs some periods of time for controllables to decide and set their actions
      state: {
        controllables: [
          // controllableActions included in state here
          {
            actionDone: a1
          },
          // ...
        ]
        // ... modified state after the controllable's actions were done
      }, // state s2
      nextSteps: [],
    },
    {
      state: {
        controllables: [
          // controllableActions included in state here
          {
            actionDone: null
          },
          // ...
        ]
        // ... go to s3 when no one do any actions
      }, // state s3
      nextSteps: [],
    }
  ]
}


// pzle: puzzle
const pzleSampleV1 = {
  path: {
    // a step obj linked list, of forwarding direction starting from 1st step
    // this obj is 1st step obj, with nextSteps
  },

  startState: {
    // a state obj.
    // used for telling unty/... how the pzle is, wt pzle to create at gm start
    // may remove this as path's start step state is already the start state
  },
}

// pzle: in-place state modification
const pzleV3_inplace = {
  state: {
    // state obj, inplace modify, units inside are obj with func constructed by constructors
  },
  steps: {
    // steps data outside of state, e.g. controllables actions done
    // linked list, so that easier access in either direction
  }
}

