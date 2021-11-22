export type TestActionType = {
   type: string
}

type ActionsType = TestActionType
type TestStateType = {
}
const initialState: TestStateType = {}

export const testReducer = (state: TestStateType = initialState, action: ActionsType): TestStateType => {
    switch (action.type) {

        default:
            return state;
    }
}
