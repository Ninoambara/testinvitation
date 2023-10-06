const initialState = {
  jobs: [],
  oneJobs: {},
  loading: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "jobs/fetchRequest":
      return {
        ...state,
        loading: true,
      };
    case "jobs/fetchSuccess":
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case "jobs/fetchOneRequest":
      return {
        ...state,
        loading: true,
      };
    case "jobs/fetchOneSuccess":
      return {
        ...state,
        oneJobs: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default jobReducer;
