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
const stateSampleV2 = {
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
  },
  prevState: {},

}

// linked list of steps as sol/path instead?
const stepSampleV1 = {
  state: {}, // state s1
  nextSteps: [
    {
      // if controllables do such actions in state s1, will results in state s2. at s1, there needs some periods of time for controllables to decide and set their actions
      controllableActions: [
        {
          controllable: c1,
          action: a1,
        },
      ],
      state: {}, // state s2
      nextSteps: [],
    },
    {
      // auto go from s1 to s3 without needing any controllables do any actions
      state: {}, // state s3
      nextSteps: [],
    },
    {
      // auto go from s1 to s3 without needing any controllables do any actions V2. or if in s1 no controllables do any actions, it will go to s3
      controllableActions: [],
      state: {}, // state s3
      nextSteps: [],
    }
  ],
  prevSteps: [
    {
      // if controllables do such actions in state s1, will results in state s2
      controllableActions: [
        {
          controllable: c1,
          action: a1,
        },
      ],
      state: {}, // state s2
      prevSteps: [],
    },
    {
      state: {},
      prevSteps: [],
    }
  ],
}

// controllableActions included in state instead
  /*
  placement of controllableActions
    place in prev state
    
    vs

    place in same state
      state: {
        controllables: [
          // controllableActions included in state here
          {
            actionDone: a1
          },
          // ...
        ]
        ... resulted state 
      }
    [ controllableActions separated out ] is a [ place in same state ] in fact
  */
// controllableActions place in same state
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
// controllableActions place in prev state
const stepSampleV2 = {
  state: {}, // state s1
  nextSteps: [
    {
      // if controllables do such actions in state s1, will results in state s2. at s1, there needs some periods of time for controllables to decide and set their actions
      state: {
        controllables: [
          // controllableActions included in state here
          {
            action: a1
          },
          // ...
        ]
        // ... remaining parts of the state is same as s1
      }, // state s2
      nextSteps: [
        {
          state: {
            // modified state after the controllable's actions were done
          }
        }
      ],
    },
  ]
}

// pzle: puzzle
const pzleSampleV1 = {
  /*
  nature
    gm use this pzle class obj too?
      gm in unty probably have another gm obj containing curr state in C# instead.
      this pzle class only serves for pzle generation and validation
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
      // id: s1
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
          // at this prev step's state s2, if controllables picked the above actions, will result in the state s1
          state: {
            // id: s2
          },
          prevSteps: []
        }
      }
    ]
  },

  reversedPathV2: {
    // is end state obj. state obj to be linked list with next and prev
    mechanics: [],
    // ...
    prevState: {
      mechanics: [],
      // ...
      prevState: {
        // ...
      }
    }
  },

  pathV3: {
    // state obj to be linked list with next and prev.
    // put end state and start state in it
  },

  startState: {
    // a state obj.
    // used for telling unty/... how the pzle is, wt pzle to create at gm start
  },
  currState: {
    // !!! remove this?
    // a state obj
    // used for pzle validation
    //   actually can still put this in a pzleGm class obj instead for pzle validation
    // may also be used for simple js gm engine?
  }
}
class Pzle {

}

const pzleGmSample = {
  currState: {
    // a state obj
    // may be used for simple js gm engine / unty js gm engine?
  }
}

/*
have data structures of pzle, state, action, ... be well defined to know how the generators should be generating diff things
generate from end state vs generate from start state
  generate from end state can ensure gd end state, e.g. consistent end state with certain format / characteristics
*/