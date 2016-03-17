const FOO = 'foo';

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FOO:
      return state;
    default:
      return state;
  }
}

export function foo() {
  return {
    type: FOO
  };
}
