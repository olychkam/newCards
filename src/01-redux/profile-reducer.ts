export type ProfileActionType = {
   type: string
}

type ActionsType = ProfileActionType
type ProfileStateType = {
}
const initialState: ProfileStateType = {}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {

        default:
            return state;
    }
}
