export const defaultState = {
    connection: {
        established: false
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
