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

const stepSample = {
  nextStep: {
    // another step obj
  },
  prevStep: {
    // another step obj
    // problem: circular, cannot export JSON
      // sol: have func for generating a non circulating version. or actually exporting of steps actions is not necessary?
  },
  // step data
  controllableActions: [],
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
/*
in-place poss problems:
  wt if some units were destroyed in some steps
    use status label instead of real deleting related objs
  why actionDone cannot be stored in in-place modifying state
    actionDone of prev steps gets overwritten by currStep, data is loss
    are there similar problems for mechs too?
*/
const pzleV3_inplace = {
  // seems should have a pzle class instead
  state: {
    // state obj, inplace modify (so it is a curr state obj in fact), units inside are obj with func constructed by constructors
  },
  currStep: {
    // currStep being navigated to in steps. navigate with state obj. so that can do forward, backward properly
    // do curr step's things (controllable actions / ...) and exec mechanics to results in next state
  },
  steps: {
    // steps data outside of state, e.g. controllables actions done
    // linked list, so that easier access in either direction
    // start from 1st step ( forward direction linked list )
  },
  endStateClone: {
    // end state's clone for checking. or just use endStateCheck is enough?
  },
  endStateCheck: () => {
    // endStateCheck func
  },
}

