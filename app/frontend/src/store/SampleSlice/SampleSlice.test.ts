import {
    IFirstObject,
    ISampleSlice,
    ISecondInnerObject,
    ISecondObject,
    getSampleSlice,
    initialState,
    sampleSlice,
    setFirstObject,
    setFirstObjectVar,
    setSampleSlice,
    setSecondInnerObject,
    setSecondInnerObjectVarOne,
    setSecondInnerObjectVarTwo,
    setSecondObject
} from '.';
import { IStoreAction } from '../../common/types';

describe('SampleSlice', () => {
    it('should return state when getSampleSlice is called', () => {
        expect(getSampleSlice({ sampleStore: initialState })).toEqual(initialState);
    });

    it('should have a default state', () => {
        const newState: ISampleSlice = sampleSlice.reducer(undefined, {
            type: 'mockType'
        });

        expect(newState).toEqual(initialState);
    });

    it('should update sampleSlice with correct value when setFirstObject is dispatched', () => {
        const payload: IFirstObject = {
            firstObjectVar: 'mockUpdate'
        };
        const action: IStoreAction = {
            type: setFirstObject.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            firstObject: payload
        });
    });

    it('should update sampleSlice with correct value when setFirstObjectVar is dispatched', () => {
        const payload: string = 'mockUpdate';
        const action: IStoreAction = {
            type: setFirstObjectVar.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            firstObject: { firstObjectVar: payload }
        });
    });

    it('should update sampleSlice with correct value when setSecondObject is dispatched', () => {
        const secondInnerObject: ISecondInnerObject = {
            secondInnerObjectVarOne: 'mockFirstVar',
            secondInnerObjectVarTwo: 'mockSecondVar'
        };
        const payload: ISecondObject = {
            secondInnerObject: secondInnerObject
        };
        const action: IStoreAction = {
            type: setSecondObject.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            secondObject: payload
        });
    });

    it('should update sampleSlice with correct value when setSecondInnerObject is dispatched', () => {
        const payload: ISecondInnerObject = {
            secondInnerObjectVarOne: 'mockFirstVar',
            secondInnerObjectVarTwo: 'mockSecondVar'
        };
        const action: IStoreAction = {
            type: setSecondInnerObject.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            secondObject: { secondInnerObject: payload }
        });
    });

    it('should update sampleSlice with correct value when setSecondInnerObjectVarOne is dispatched', () => {
        const payload: string = 'mockUpdate';
        const action: IStoreAction = {
            type: setSecondInnerObjectVarOne.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            secondObject: {
                secondInnerObject: {
                    ...initialState.secondObject.secondInnerObject,
                    secondInnerObjectVarOne: payload
                }
            }
        });
    });

    it('should update sampleSlice with correct value when setSecondInnerObjectVarTwo is dispatched', () => {
        const payload: string = 'mockUpdate';
        const action: IStoreAction = {
            type: setSecondInnerObjectVarTwo.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            secondObject: {
                secondInnerObject: {
                    ...initialState.secondObject.secondInnerObject,
                    secondInnerObjectVarTwo: payload
                }
            }
        });
    });

    it('should update sampleSlice with correct value when setSampleSlice is dispatched', () => {
        const firstObject: IFirstObject = {
            firstObjectVar: 'mockFirstObjectVar'
        };
        const secondInnerObject: ISecondInnerObject = {
            secondInnerObjectVarOne: 'mockSecondInnerObjectVarOne',
            secondInnerObjectVarTwo: 'mockSecondInnerObjectVarTwo'
        };
        const secondObject: ISecondObject = {
            secondInnerObject: secondInnerObject
        };
        const payload: ISampleSlice = {
            firstObject: firstObject,
            secondObject: secondObject
        };
        const action: IStoreAction = {
            type: setSampleSlice.type,
            payload: payload
        };
        const newState: ISampleSlice = sampleSlice.reducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            firstObject: payload.firstObject,
            secondObject: payload.secondObject
        });
    });
});
