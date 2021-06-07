class PzleGenerator {
  constructor(size, possMechanics) {
    this.size = size
    this.endState = null
    this.possMechanics = possMechanics
  }
}

// data structures
const controllableSampleV1 = {
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
const stateSampleV1 = {
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
  /*
  needs / requirements for pzle obj
    enough info for unty to generate gm
      only start state is enough?
        path is also needed if have func of [ reveal ans ]
    prove that pzle can be solved?

  Path: poss path the gm may goes down, including the N diff solutions and M diff failures. Paths should be of tree structure, start at start state, diff user action executed lead to diff nextState and their next child tree of path
    data needed for unty to build the pzle and for match to start:
      actually only start state is needed. the whole path is only for showing that the pzle can be solved
      testing should verify if pzle in unty can be played exactly as the path obj stated
  */
  pathV1: {
    /*
    controllable's actions should simply be some facts and should not be distinguishly separated out?
    */
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

  pathV2: {
    // controllable's actions to be normal facts
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
    // a state obj
  },
  currState: {
    // a state obj
  }
}
class Pzle {

}

/*
have data structures of pzle, state, action, ... be well defined to know how the generators should be generating diff things
generate from end state vs generate from start state
  generate from end state can ensure gd end state, e.g. consistent end state with certain format / characteristics
*/